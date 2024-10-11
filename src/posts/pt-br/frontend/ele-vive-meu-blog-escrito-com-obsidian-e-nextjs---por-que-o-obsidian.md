---
id: 7fc21547-21dc-481c-ae8d-6513fcf8ae08
title: Ele vive! Meu Blog escrito com Obsidian e Next.js - Por que o Obsidian?
tldr: Embarquei na aventura do gerenciamento de notas com a Obsidian, o canivete suíço dos desenvolvedores que me permite usar a linguagem Markdown com facilidade. Comentei sobre o sistema de organização Zettelkasten e dei um mergulho profundo no mundo do frontmatter. Quer mais diversão? Eu garanto! Explorei como construir um template fixo para meus artigos, dando super poderes ao Obsidian com o plugin Templater, para automatizar o frontmatter e fazendo passo a passo o código para entender a mágica por trás disso. E para terminar, como todo bom herói deve fazer, mostrei como gerenciar suas postagens com o git e atualizá-las automaticamente com o plugin do Obsidian.
series: ''
tags: [obsidian, nextjs, tailwindcss, contentlayer]
cover_image: https://bozxmjnovrpwutckazhx.supabase.co/storage/v1/object/public/images/its-alive-p2.png?t=2023-06-08T00%3A46%3A55.626Z
alias: ele-vive-meu-blog-escrito-com-obsidian-e-nextjs---por-que-o-obsidian
path: pt-br/frontend/ele-vive-meu-blog-escrito-com-obsidian-e-nextjs---por-que-o-obsidian
created_at: 2023-06-25T10:21:38.3838-03:00
lang: pt-br
published: true
---
![Cover Image](https://bozxmjnovrpwutckazhx.supabase.co/storage/v1/object/public/images/its-alive-p2.png?t=2023-06-08T00%3A46%3A55.626Z)


# Ele vive! Meu Blog escrito com Obsidian e Next.js - Por que o Obsidian?

## TL;DR
Embarquei na aventura do gerenciamento de notas com a Obsidian, o canivete suíço dos desenvolvedores que me permite usar a linguagem Markdown com facilidade. Comentei sobre o sistema de organização Zettelkasten e dei um mergulho profundo no mundo do frontmatter. Quer mais diversão? Eu garanto! Explorei como construir um template fixo para meus artigos, dando super poderes ao Obsidian com o plugin Templater, para automatizar o frontmatter fazendo passo a passo o código para entender a mágica por trás disso. E para terminar, como todo bom herói deve fazer, mostrei como gerenciar suas postagens com o git e atualizá-las automaticamente com o plugin do Obsidian.

## Obsidian: A Inovação no Gerenciamento de Notas para Desenvolvedores
Vivo em um mundo onde o gerenciamento de notas tornou-se uma ferramenta indispensável para a organização do meu fluxo de trabalho. Com diversas opções disponíveis, como **Notion e OneNote**, a busca pela ferramenta ideal pode ser um desafio. Já experimentei várias na tentativa de manter minhas notas e estudos organizados e acessíveis. Entretanto, quando me deparei com o ==Obsidian,== percebi instantaneamente sua singularidade. Sua funcionalidade de ==backlinks== aliada à utilização com a linguagem Markdown (uma vez que nós, desenvolvedores, temos uma afinidade inata com a codificação) colocou o Obsidian em um patamar diferenciado.

## Organização de Notas
Ao começar a utilizar qualquer ferramenta de gerenciamento de notas, me deparei com a necessidade de pesquisar sobre as melhores técnicas para organizar minhas anotações. Aposto que, assim como eu, você se deparará com o ==Zettelkasten==, um método que propõe um sistema de indexação das nossas anotações que facilita o acesso, mesmo em meio a grandes volumes de notas armazenadas. Claro que não existe uma solução universal para esse desafio, e é por isso que adaptei minhas anotações pessoais e de estudo ao método Zettelkasten, enquanto mantenho o sistema de agrupamento do blog mais simplificado para facilitar a compreensão dos usuários em relação às URLs.

## Frontmatter: Estruturando Informações para Gerenciar Artigos
Dentro do contexto do Markdown, o ==frontmatter é um bloco de metadados==  adicionado no início de um documento. Ainda que o Markdown não tenha suporte direto ao frontmatter, ele é comumente utilizado em sistemas de gerenciamento de conteúdo e geradores de sites estáticos, bem como no Obsidian para casos específicos.

O frontmatter no Markdown é geralmente delimitado por três traços ```---``` e composto por informações estruturadas nos formatos ==YAML, TOML ou JSON==. Estas informações podem incluir o título do documento, data de criação, autor, categorias, tags e quaisquer outros dados relevantes para a organização e apresentação do conteúdo.

Quando um documento Markdown com frontmatter é processado, o sistema de gerenciamento de conteúdo ou o gerador de sites estáticos pode analisar estas informações e as utiliza para gerar o layout da página, aplicar estilos específicos, e até mesmo criar índices e páginas de categoria. Neste artigo, explorei como implementar e aproveitar esses dados em meu projeto com o Contentlayer, incluindo a tipagem dos dados do blog.

Para este projeto específico, escolhi a seguinte combinação de variáveis para o meu frontmatter:

```md showLineNumbers title="Frontmatter"
---
id: UUID
title: ''
tldr: ''
series: ''
tags: [tag1, tag2, tag3, ...]
cover_image: https://image.example
alias: ''
path: path/to/my/articlhe (será o path na url final do blog)
created_at: YYYY-MM-DDTHH:mm:ss.sssZ
lang: pt-br (default)
published: false (default)
---
```

Se para você parece confuso, fique tranquilo que já veremos como gerar automaticamente esses campos.

## Estrutura fixa em template
Para que possamos automatizar a criação do frontmatter precisaremos ter um template fixo para os meus artigos, pois usarei scripts que vão ter a estrutura e extrair informações. Mas para isso você precisa entender como funcionam os templates no Obsidian.
Como de padrão, vou considerar que você já visitou a [Documentação do Obsidian](https://help.obsidian.md/Plugins/Templates) ou que já explorou o aplicativo a ponto de debatermos apenas a estrutura escolhida. Na estrutura teremos um cabeçalho contendo:
- **Título**: Que será usado para preencher um campo no frontmatter de mesmo nome, mas também para definir o nome do arquivo, dentro do repositório, o caminho do arquivo em um path e o alias do mesmo.
- **Imagem**: que será minha imagem principal do artigo e será armazenado como ```cover_image``` e posteriormente separado do corpo do artigo em nosso HTML.
- **TL;DR:**  Se você não conhece essas sigas, elas são a abreviação da expressão =="too long; didn't read"==, que em inglês significa "muito longo; não li". E como já deu para entender, será meu resumo para uso posterior.

Também teremos um rodapé separado contendo o nome da série de postagens e das tags. Ele foi pensado separadamente pois o obsidian não reconhece tags escritas diretamente no frontmatter o que me levou a ter essa estrutura de rodapé. Ela será definida sempre após o último divisor o que nos leva aos seguintes itens:
- **Divisor**: O último divisor sempre vai ser o marcador que precede o rodapé,  que é representado por ```---```  no markdown. A lógica de detecção você verá em próximos posts quando falarei dos plugins **remark e rehype.**
- **Tags**: Bem auto explicativo pelo visto e com mesmo nome para variável, mas cabe destacar que a escolha de 4 tags vai de encontro como a proposta de compartilhar essas postagens em outras plataformas como **Dev.to, Medium e Hashnode**, pois algumas **aceitam 5 tags e outras 4 tags**.
- **Série**: Essa vem inspirada no conceito de **série de postagens do Dev.to** e que me parece bem interessante, sendo representada pela variável ```series``` e não obrigatória.

```md showLineNumbers title="Example"
---
tags: #tag01 #tag02 ...
series: Nome da série de postagens
```

## Automatizando o Frontmatter: O poder dos plugins
Uma das características mais atraentes do Obsidian é a capacidade de ==personalização por meio dos plugins==, que permitem adaptar a ferramenta às nossas necessidades específicas. Você pode explorar uma variedade de plugins disponíveis no site oficial do Obsidian. No entanto, **para a automatização do Frontmatter,** recorri ao ==Templater==, um plugin que não apenas atendeu às minhas necessidades básicas de criação de templates para os posts, mas também oferece a possibilidade de criar scripts para automatizar tarefas nesses templates. Recomendo fortemente a leitura da documentação do plugin, que você pode acessar em [Documentação do Templater](https://silentvoid13.github.io/Templater/).

Assumindo que você já tenha se familiarizado com a documentação do Templater, vou focar em uma breve explicação sobre como utilizá-lo. Comecei com o uso de variáveis para acessar informações do Obsidian. Abaixo, temos um exemplo de como gerar um título e a data atual:

```md showLineNumbers title="Example"
# <% tp.file.title %>
This file is created at <% tp.file.creation_date() %>
```

O resultado será a apresentação do título e da data de criação. E o Templater nos fornece alguns métodos prontos para facilitar nossa vida, porém não vou me detalhar pois acredito que você não é preguiçoso e vai ler a documentação.
Veja mais um exemplo:

```js showLineNumbers title="Example"
Date now: <% tp.date.now() %>
Date now with format: <% tp.date.now("Do MMMM YYYY") %>

Last week: <% tp.date.now("dddd Do MMMM YYYY", -7) %>
Today: <% tp.date.now("dddd Do MMMM YYYY, ddd") %>
Next week: <% tp.date.now("dddd Do MMMM YYYY", 7) %>

Last month: <% tp.date.now("YYYY-MM-DD", "P-1M") %>
Next year: <% tp.date.now("YYYY-MM-DD", "P1Y") %>

File's title date + 1 day (tomorrow): <% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>
File's title date - 1 day (yesterday): <% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>

Date tomorrow with format: <% tp.date.tomorrow("Do MMMM YYYY") %>

This week's monday: <% tp.date.weekday("YYYY-MM-DD", 0) %>
Next monday: <% tp.date.weekday("YYYY-MM-DD", 7) %>
File's title monday: <% tp.date.weekday("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>
File's title next monday: <% tp.date.weekday("YYYY-MM-DD", 7, tp.file.title, "YYYY-MM-DD") %>

Date yesterday with format: <% tp.date.yesterday("Do MMMM YYYY") %>
```

Entretanto, para a operação do blog, precisei ir um passo adiante. Graças à possibilidade do Templater de trabalhar com JavaScript, consegui criar scripts de automação que solucionaram completamente a criação do Frontmatter.

```js showLineNumbers title="Templater script"
<%*
    // Generate a UUID
    const uuid = crypto.randomUUID();

    // Get tags from the file, removing the "#" symbol
    const tags = tp.file.tags.map(tag => tag.replace("#", "").trim()).join(", ");

    // Read the file content and split it into lines
    const fileContent = tp.file.content;
    const lines = fileContent.split('\n');

	// Find the first valid image after the frontmatter
    const firstImage = lines.find(line => line.startsWith("!["))
    const urlRegex = /\((.*?)\)/;
    const matches = firstImage.match(urlRegex);
    const cover_image = matches[1];
    // Find the first valid series info after the frontmatter
    let series = lines.find(line => line.startsWith("series:"))
    series = series.replace("series:", "").trim()

    // Find the first valid line after the frontmatter
    let title = lines.find(line => line.startsWith("#"))
    title = title.substring(1).trim()

    // TL;DR
	let tldr= '';
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith('## TL;DR')) {
			console.log(lines[i + 1])
			  tldr = lines[i + 1].trim();
			  break;
		}
	  };

    // Create a new file name based on the first valid line, normalizing the text and removing special characters
    const alias = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .toLowerCase().trim().replace(/\s+/g, "-");

    // Rename the file using the new file name
    tp.file.rename(`${alias}`)

	let path = tp.file.path(true).split("/")
	path[path.length - 1] = `${alias}.md`
	path = path.join("/").replace(".md", "")
%>---
id: <% uuid %>
title: <% title %>
tldr: <% tldr %>
series: <% series %>
tags: [<% tags %>]
cover_image: <% cover_image %>
alias: <% alias %>
path: <% path %>
created_at: <% tp.date.now("YYYY-MM-DDTHH:mm:ss.sssZ") %>
lang: pt-br
published: false
---
```

## Decifrando o Código

Se este código parece algo saído diretamente das profundezas da ==Matrix==, não se preocupe. Pois, na verdade, é apenas um bom e velho script ==JavaScript==.
Então, respire fundo e venha comigo, pois decodificaremos juntos, passo a passo, e, quem sabe, até nos divertiremos um pouco no processo! Nosso código misterioso está usando diversas funções do Templater, além de alguns truques astutos de JavaScript. para coletar informações e popular meu frontmatter.

No início do script, um identificador único conhecido como ==UUID é gerado.== Utilizarei este UUID como o ID do meu post.

```js showLineNumbers title="Example"
// Generate a UUID
const uuid = crypto.randomUUID();
```

Em seguida, o script ==obtém todas as tags== do arquivo (eliminando o símbolo "#"), separando-as por vírgulas e armazenando-as em uma variável.
```js showLineNumbers title="Example"
// Get tags from the file, removing the "#" symbol
const tags = tp.file.tags.map(tag => tag.replace("#", "").trim()).join(", ");
```

O ==conteúdo do arquivo== é então lido e dividido em linhas.
```js showLineNumbers title="Example"
// Read the file content and split it into lines
const fileContent = tp.file.content;
const lines = fileContent.split('\n');
```

O script procura a ==primeira imagem== válida após o frontmatter.
```js showLineNumbers title="Example"
// Find the first valid image after the frontmatter
const firstImage = lines.find(line => line.startsWith("!["))
const urlRegex = /\((.*?)\)/;
const matches = firstImage.match(urlRegex);
const cover_image = matches[1];
```

Em seguida, busca a primeira ==informação válida de série== após o frontmatter.
```js showLineNumbers title="Example"
// Find the first valid series info after the frontmatter
let series = lines.find(line => line.startsWith("series:"))
series = series.replace("series:", "").trim()
```

Depois, identifica a ==primeira linha válida== após o frontmatter, que ==será utilizada como título.==
```js showLineNumbers title="Example"
// Find the first valid line after the frontmatter
    let title = lines.find(line => line.startsWith("#"))
    title = title.substring(1).trim()
```

O script também busca uma breve ==descrição do conteúdo==, identificada por ==TL;DR.==
```js showLineNumbers title="Example"
// TL;DR
let tldr= '';
for (let i = 0; i < lines.length; i++) {
	if (lines[i].startsWith('## TL;DR')) {
		console.log(lines[i + 1])
		  tldr = lines[i + 1].trim();
		  break;
	}
};
```


Por fim, o script ==normaliza o título do post== para ser utilizado como o ==alias e o caminho do arquivo==, removendo caracteres especiais e convertendo tudo para minúsculas. O arquivo é então renomeado com este alias.
```js showLineNumbers title="Example"
// Create a new file name based on the first valid line, normalizing the text and removing special characters
const alias = title
	.normalize("NFD")
	.replace(/[\u0300-\u036f]/g, "")
	.replace(/[^a-zA-Z0-9\s-]/g, "")
	.toLowerCase().trim().replace(/\s+/g, "-");

// Rename the file using the new file name
tp.file.rename(`${alias}`)

let path = tp.file.path(true).split("/")
path[path.length - 1] = `${alias}.md`
path = path.join("/").replace(".md", "")
```


O ==frontmatter é então gerado== utilizando todos esses valores que acabamos de calcular.
```js showLineNumbers title="Example"
%>---
id: <% uuid %>
title: <% title %>
tldr: <% tldr %>
series: <% series %>
tags: [<% tags %>]
cover_image: <% cover_image %>
alias: <% alias %>
path: <% path %>
created_at: <% tp.date.now("YYYY-MM-DDTHH:mm:ss.sssZ") %>
lang: pt-br
published: false
---

```

## Relação com a estrutura geração do blog
Aqui é onde a mágica acontece: a biblioteca ==Contentlayer, que converte arquivos MDX para HTML==, pode usar as informações do frontmatter para gerar a tipagem dinâmica e os dados necessários para criar os artigos, como o título, a descrição, a imagem de capa, e mais.

Ao configurar o Contentlayer para interpretar o frontmatter, ele será capaz de gerar a página estática do blog com todas as informações do post. Isso é especialmente útil porque pode ser feito de forma dinâmica, com base no frontmatter de cada arquivo. O resultado é um blog extremamente flexível e fácil de gerenciar, onde eu posso facilmente adicionar, modificar ou remover posts apenas editando os arquivos MDX.
Abaixo tem um trecho do código de configuração do Contentlayer que usa o mesmo modelo de frontmatter para gerar a tipagem dos dados que serão lidos. É apenas uma amostra do que vou mostrar no post ensinando a configurar essa lib.

```js showLineNumbers title="Example"
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.{mdx,md}',
  contentType: 'mdx',
  fields: {
    id: { type: 'string', required: true, isId: true },
    title: { type: 'string', required: true },
    tldr: { type: 'string', required: true },
    series: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    cover_image: { type: 'string', required: true },
    alias: { type: 'string', required: false },
    path: { type: 'string', required: true },
    created_at: { type: 'date', required: true },
    lang: { type: 'string', required: true },
    published: { type: 'boolean', required: false }
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: (doc: { body: { raw: string } }) => readingTime(doc.body.raw)
    },
    url: {
      type: 'string',
      resolve: (post: { _raw: { flattenedPath: string } }) => `/posts/${post._raw.flattenedPath}`
    }
  }
}))
```

## Gerenciando postagens com git e subindo com plugin do Obsidian
Quando eu terminar de escrever meu artigo no Obsidian, tudo que eu preciso fazer é usar o plugin [Obsidian Git](https://github.com/denolehov/obsidian-git) para ==enviar minhas mudanças para o GitHub.== Isso é incrivelmente conveniente porque eu não preciso sair do Obsidian para fazer isso. E graças à ==integração do Next.js com a Vercel e GitHub==, assim que eu fizer o push, meu blog será automaticamente atualizado. Existem mais plugins que permitem eu gerenciar o git por dentro do obsidian, explore as possibilidades.

## Conclusão
Criar um blog do zero é uma ==jornada incrível== que combina tecnologia, organização, criatividade e, ==acima de tudo, paixão.== Neste segundo ato da saga, naveguei pelos vastos oceanos da ==Obsidian==, criando e automatizando templates de ==frontmatter,== abraçando a simplicidade do ==Markdown== e o poder do sistema ==Zettelkasten.== Adicionalmente, relembrei a maravilhosa biblioteca ==Contentlayer,== que permite transformar arquivos MDX em HTML com facilidade.

Além disso, trouxe à tona a importância do gerenciamento eficiente de minhas postagens usando git e como podemos ==atualizar as postagens automaticamente== com a ajuda do plugin do Obsidian. Cada passo que dei, me leva mais perto do objetivo final: um blog personalizado, eficiente e simples de gerenciar.

No entanto, mesmo com todos os progressos que fiz, esta saga ainda está longe de terminar. Ainda terei algumas postagens desta série até cobrir por completo o projeto de criação do blog e há ainda muito a aprender, muitas ferramentas para descobrir e muitas estratégias para implementar. Então, convido você a continuar nesta jornada comigo. Nos próximos capítulos, vou aprofundar ainda mais na criação do blog, apresentando detalhes do de código e tecnologias usadas. Porque, no final das contas, a verdadeira beleza desta saga é o processo de aprendizado e descoberta.

E lembre-se, ==o mais importante em todo o processo é se divertir!== Portanto, explore todas as possibilidades que essas ferramentas oferecem e aproveite o processo de compartilhar seus pensamentos e ideias com o mundo.

---
tags: #obsidian #nextjs #tailwindcss #contentlayer
series: Ele vive! Meu Blog
