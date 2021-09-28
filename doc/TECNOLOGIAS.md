# SSC0952 --- Internet das Coisas

## Apresentação do Grupo

### Grupo 7

- Antônio Pedro Medrado --- 10748389
- Lucas Viana Vilela --- 10748409
- Yann Amado Nunes Rocha --- 10746943

### Time 1

Integrando o Time 1, o Grupo 7 é responsável pela parte da aplicação do projeto. Portanto, desenvolverá a interface através da qual o usuário irá se comunicar com o sistema de controle dos equipamentos do LaSDCP.

## Tecnologias Utilizadas

Para o desenvolvimento da aplicação, optou-se pelo desenvolvimento de um aplicativo *web* com uso das seguintes tecnologias:

- [React](#react)
- [TypeScript](#typescript)
- [SCSS](#scss)

### <a id="react"></a> *React*

Juntamento com *Vue* e *Angular*, *React* é um dos principais *frameworks* modernos para desenvolvimento *web* com *JavaScript* e *TypeScript*, sendo usado amplamente no mercado relacionado. Ele serve para integrar mais fortemente o desenvolvimento de *JavaScript* e *HTML* em um único tipo de arquivo e de forma mais ágil e com um melhor controle e fluxo de dados do que sem um *framework*, através de toda a API que expõe.

Algumas das principais vantagens do *React* em com paração com os outros é que ele foi desenhado para ser um *framework* com uma curva de aprendizado pouco íngreme e passível de uma adoção gradual. Ao mesmo tempo, ele é extremamente extensível e dispõe de diversas funcionalidades para o desenvolvimento de aplicações mais complexas.

Portanto, ele é uma ótima opção para atender a todos os integrantes do grupo, tanto a parcela que nunca trabalhou com desenvolvimento *web* e precisa se habituar com as tecnologias envolvidas, quanto a que já possui mais experiência na área --- inclusive com o próprio *React*.

Além disso, o *framework* do *Facebook* é muito pouco "opinionado". Ou seja, que não institui ao programador um formato rígido e pré-definida para a estrutura do projeto: ele é bastante flexível e dá a liberdade de se arquitetar o código como se queira. Por um lado, isso é positivo, já que permite aos desenvolvedores um fluxo de trabalho mais personalizado e que melhor se adapta à situação; por outro, pode ser uma desvantagem, já que adiciona uma camada maior de complexidade na preparação do projeto, passando também para o time a responsabilidade pelo planejamento estrutural, além da manutenção de sua consistência --- o pode se tornar algo trabalhoso para trabalhos de grande porte.

### <a id="typescript"></a> *TypeScript*

*TypeScript* é envoltório (*wrapper*) para *JavaScript*, que garante e impõe tipagem estática à linguagem. Optou-se pelo uso desse superconjunto pois a tipagem estática garante uma miríade de benefícios para o projeto:

- Melhor *intellisense* nos editores ou IDEs;
- Maior legibilidade do código com a definição dos tipos de variáveis e função;
- Maior facilidade para fazer *debug*, refatoração e manutenção do código, especialmente para projetos de médio a grande porte;
- Maior facilidade para a documentação do código;

Entretanto, como a tipagem dinâmica é essencialmente a introdução de burocracia na linguagem, ela apreenta também pontos negativos. Dentre eles, destaca-se um desenvolvimento mais lento e menos ágil do que com *JavaScript*; a introdução de uma nova etapa no ciclo de desenvolvimento, a de compilação do programa, e o tempo de espera associado a ela; e a possibilidade de incompatibilidade com bibliotecas.

### <a id="scss"></a> SCSS

De forma análoga ao que o *TypeScript* é para o *JavaScript*, o SCSS é um pré-processador de CSS: uma extensão dessa linguagem que proporciona novas funcionalidades e uma sintaxe mais amigável.

Essa extensão permite um maior reuso do código, através da definição de variáveis, funções e modelos de forma que não é possível no CSS padrão, além de uma sintaxe mais simples e intuitiva.

