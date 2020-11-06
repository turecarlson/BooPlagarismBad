// import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
// import { ParseTree } from 'antlr4ts/tree/ParseTree';
// import { RuleNode } from 'antlr4ts/tree/RuleNode';
// import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
// import { parse, createVisitor, ConcreteVisitor, AnnotationConstantRestContext, AnnotationContext, AnnotationMethodOrConstantRestContext, AnnotationMethodRestContext, AnnotationTypeBodyContext, AnnotationTypeDeclarationContext, AnnotationTypeElementDeclarationContext, AnnotationTypeElementRestContext, ArgumentsContext, ArrayCreatorRestContext, ArrayInitializerContext, BlockContext, BlockStatementContext, CatchClauseContext, CatchTypeContext, ClassBodyContext, ClassBodyDeclarationContext, ClassCreatorRestContext, ClassDeclarationContext, ClassOrInterfaceModifierContext, ClassOrInterfaceTypeContext, ClassTypeContext, CompilationUnitContext, ConstantDeclaratorContext, ConstDeclarationContext, ConstructorDeclarationContext, CreatedNameContext, CreatorContext, DefaultValueContext, ElementValueArrayInitializerContext, ElementValueContext, ElementValuePairContext, ElementValuePairsContext, EnhancedForControlContext, EnumBodyDeclarationsContext, EnumConstantContext, EnumConstantsContext, EnumDeclarationContext, ExplicitGenericInvocationContext, ExplicitGenericInvocationSuffixContext, ExpressionContext, ExpressionListContext, FieldDeclarationContext, FinallyBlockContext, FloatLiteralContext, ForControlContext, ForInitContext, FormalParameterContext, FormalParameterListContext, FormalParametersContext, GenericConstructorDeclarationContext, GenericInterfaceMethodDeclarationContext, GenericMethodDeclarationContext, ImportDeclarationContext, InnerCreatorContext, IntegerLiteralContext, InterfaceBodyContext, InterfaceBodyDeclarationContext, InterfaceDeclarationContext, InterfaceMemberDeclarationContext, InterfaceMethodDeclarationContext, InterfaceMethodModifierContext, LambdaBodyContext, LambdaExpressionContext, LambdaParametersContext, LastFormalParameterContext, LiteralContext, LocalTypeDeclarationContext, LocalVariableDeclarationContext, MemberDeclarationContext, MethodBodyContext, MethodCallContext, MethodDeclarationContext, ModifierContext, NonWildcardTypeArgumentsContext, NonWildcardTypeArgumentsOrDiamondContext, PackageDeclarationContext, ParExpressionContext, PrimaryContext, PrimitiveTypeContext, QualifiedNameContext, QualifiedNameListContext, ResourceContext, ResourcesContext, ResourceSpecificationContext, StatementContext, SuperSuffixContext, SwitchBlockStatementGroupContext, SwitchLabelContext, TypeArgumentContext, TypeArgumentsContext, TypeArgumentsOrDiamondContext, TypeBoundContext, TypeDeclarationContext, TypeListContext, TypeParameterContext, TypeParametersContext, TypeTypeContext, TypeTypeOrVoidContext, VariableDeclaratorContext, VariableDeclaratorIdContext, VariableDeclaratorsContext, VariableInitializerContext, VariableModifierContext  } from 'java-ast';
// import { JavaParserVisitor} from 'java-ast/dist/parser/JavaParserVisitor';
// import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';

// class MyVisitor<T> extends AbstractParseTreeVisitor<T> {
//   constructor() {
//     super();
//   }

//   protected defaultResult(): T {
//     return undefined;
//   }

//   visitMethodDeclaration(ctx: MethodDeclarationContext) : any {
//     console.log(ctx.methodBody().toStringTree(),"\n\n\n");
//     return undefined;
//   }

// }


// let ast = parse(`
// class A {
//   int a;
//   void thisisa() {
//     int c = 3;
//     int d = 5;
//   }
//   void c() {}
// }
// class B {
//   // void z() {}
// }
// `);

// let visitor = new MyVisitor<any>();
// // visitor.visit(ast);

// console.log(ast);