import { ParseResult, parse } from '@babel/parser';
import { ClassBody, File, Statement, Identifier, Pattern, RestElement, TSParameterProperty } from '@babel/types';

type ParsedParam = {
    name: string;
    default?: any;
};

type ParsedMethod = {
    name: string;
    params: ParsedParam[];
    comments: string[];
    kind: string;
    dependency?: ParsedDependency[];
    isFrontline: boolean;
};

type ParsedDependency = {
    class: string;
    instance: string;
};

export type ParsedClass = {
    name: string;
    methods: ParsedMethod[];
    isAutowired: boolean;
}

function isAutowiringClass(codeClass: Statement): Boolean {
    return codeClass.leadingComments && codeClass.leadingComments.length > 0 && codeClass.leadingComments.filter((comment) => comment.value === '@Autowired').length != 0
}

function getParams(params: (Identifier | Pattern | RestElement | TSParameterProperty)[] = []): ParsedParam[] {
    const paramList: ParsedParam[] = [];
    params.map((param: Identifier|Pattern) => {
        if (param.type === 'Identifier') {
            paramList.push({
                name: param.name,
                default: undefined
            })
        } else if (param.type === 'AssignmentPattern') {
            paramList.push({
                name: param.left['name'],
                default: param.right['value']
            })
        }
    })
    return paramList;
}

function parseMultipleCommentsDependency(comments: string[] = []): ParsedDependency[] {
    let result: ParsedDependency[] = [];
    comments.forEach(comment => {
        result = result.concat(parseDependency(comment));
    })
    return result;
}

function parseDependency(comment: string = ''): ParsedDependency[] {
    const result: ParsedDependency[] = [];
    const re = comment.matchAll(/(?:\@param\s*\{(\w+)\}\s*(\w+))/g)
    while(true) {
        const match = re.next();
        if (match.done)
            break;
        if (match.value.length !== 3)
            continue;
        result.push({
            class: match.value[1],
            instance: match.value[2]
        });
    }
    return result;
}

function getMethods(codeClassBody: ClassBody): ParsedMethod[] {
    const methodList: ParsedMethod[] = [];
    codeClassBody.body.forEach(insideClassCode => {
        if (insideClassCode.type === 'ClassMethod' && insideClassCode.kind === 'constructor') {
            const comments = (insideClassCode.leadingComments || []).filter(comment => comment.type === 'CommentBlock').map(comment => comment.value);
            methodList.push({
                name: insideClassCode.key['name'],
                kind: insideClassCode.kind,
                params: getParams(insideClassCode.params),
                comments,
                dependency: parseMultipleCommentsDependency(comments),
                isFrontline: comments.filter(comment => comment === '@frontline').length > 0
            })
        } else if (insideClassCode.type === 'ClassMethod' && insideClassCode.kind === 'method') {
            const comments = (insideClassCode.leadingComments || []).filter(comment => comment.type === 'CommentLine').map(comment => comment.value)
            methodList.push({
                name: insideClassCode.key['name'],
                kind: insideClassCode.kind,
                params: getParams(insideClassCode.params),
                comments,
                dependency: [],
                isFrontline: comments.filter(comment => comment === '@frontline').length > 0
            })
        }
    });
    return methodList;
}

function getClasses(programs: Statement[]): ParsedClass[] {
    const classList: ParsedClass[] = [];
    programs.forEach(program => {
        if (program.type === 'ClassDeclaration' && isAutowiringClass(program)) {
            classList.push({
                name: program.id.name,
                methods: getMethods(program.body),
                isAutowired: (program.leadingComments || []).filter(comment => comment.type === 'CommentLine' && comment.value === '@Autowired').length > 0
            });
        }
    });
    return classList;
}

export function parseCode(fileName: string, code: string): ParsedClass[] {

    // .errors[] <- check it's len 0
    // .program.body[]

    // If class exist -> 
    // type: ClassDeclaration
    // id.name: Class's name
    // superClass.name: Class's extend class name
    // leadingComments[] -> type: CommentLine
    //                      value: @Autowired

    // body:
    //  type: ClassBody
    //  body[]: 


    // class body methods
    // type: ClassMethod
    // kind: method / constructor
    // key.name: name
    // params[]: .name / type: Identifier or AssignmentPattern (.left.name and .right.value)
    // leadingComments[]: .value
    const parseResult: ParseResult<File> = parse(code);
    if (parseResult.errors.length > 0) {
        parseResult.errors.forEach((err) => {
            console.error(`[${fileName}] parse error ${err.code} / ${err.reasonCode}`);
        })
        throw new Error(`parse error!`);
    } else {
        if (parseResult.program.body.length <= 0) {
            console.warn(`[${fileName}] has no code`);
            return [];
        } else {
            return getClasses(parseResult.program.body);
            // [{"name":"Index","methods":[{"name":"constructor","kind":"constructor","params":[{"name":"index1Controller"},{"name":"index2Controller"}],"comments":["*\n     * @param {Index1Controller} index1Controller\n     * @param {Index2Controller} index2Controller\n     "],"dependency":[{"class":"Index1Controller","instance":"index1Controller"},{"class":"Index2Controller","instance":"index2Controller"}],"isFrontline":false},{"name":"createFoo","kind":"method","params":[{"name":"req"},{"name":"res"},{"name":"next"}],"comments":["@frontline"],"dependency":[],"isFrontline":true},{"name":"createBar","kind":"method","params":[{"name":"req"},{"name":"res"},{"name":"next"}],"comments":[],"dependency":[],"isFrontline":false},{"name":"updateFoo","kind":"method","params":[{"name":"req"}],"comments":["@frontline"],"dependency":[],"isFrontline":true},{"name":"updateBar","kind":"method","params":[{"name":"req"}],"comments":[],"dependency":[],"isFrontline":false},{"name":"selectFoo","kind":"method","params":[],"comments":["@frontline"],"dependency":[],"isFrontline":true},{"name":"selectBar","kind":"method","params":[],"comments":[],"dependency":[],"isFrontline":false},{"name":"deleteFoo","kind":"method","params":[{"name":"req1"},{"name":"res2"}],"comments":["@frontline"],"dependency":[],"isFrontline":true},{"name":"deleteFoo","kind":"method","params":[{"name":"req1"},{"name":"res2"}],"comments":[],"dependency":[],"isFrontline":false},{"name":"under_bar_Foo","kind":"method","params":[{"name":"req1"},{"name":"res2"}],"comments":["@frontline"],"dependency":[],"isFrontline":true},{"name":"under_bar_Foo","kind":"method","params":[{"name":"req1"},{"name":"res2"}],"comments":[],"dependency":[],"isFrontline":false},{"name":"defaultFoo","kind":"method","params":[{"name":"req1"},{"name":"res2","default":false}],"comments":["@frontline"],"dependency":[],"isFrontline":true},{"name":"defaultFoo","kind":"method","params":[{"name":"req1"},{"name":"res2","default":false}],"comments":[],"dependency":[],"isFrontline":false}],"isAutowired":true}]
        }
    }
}