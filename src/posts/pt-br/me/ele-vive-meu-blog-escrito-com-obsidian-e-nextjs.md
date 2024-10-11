---
id: 1d0e0742-729b-4a74-a6aa-dcdd98413ffc
title: Ele vive! Meu Blog escrito com Obsidian e Next.js
tldr: Minha jornada na criação do meu blog foi cheia de desafios e recompensas incríveis. Enfrentei obstáculos técnicos, mergulhei de cabeça nas tecnologias Next.js, Tailwind CSS, Contentlayer e Obsidian e finalmente alcancei o resultado desejado. Ver meu blog ganhar vida para compartilhar meus conhecimentos com a comunidade foi uma experiência gratificante e estimulante. Se você está pensando em embarcar nessa jornada de criação do seu próprio blog ou está em busca de motivação para enfrentar desafios pessoais, acredito que minha história irá inspirá-lo e ajudá-lo a seguir em frente. Não perca a oportunidade de aprender com meus desafios e descobertas, e mergulhe nessa jornada de crescimento e realização pessoal.
series: Ele vive! Meu Blog
tags: [blog, nextjs, tailwindcss, contentlayer]
cover_image: https://bozxmjnovrpwutckazhx.supabase.co/storage/v1/object/public/images/its-alive.jpg?t=2023-05-24T01%3A04%3A12.460Z
alias: ele-vive-meu-blog-escrito-com-obsidian-e-nextjs
path: pt-br/me/ele-vive-meu-blog-escrito-com-obsidian-e-nextjs
created_at: 2023-05-31T00:04:24.2424-03:00
lang: pt-br
published: true
---
![It's Alive!](https://bozxmjnovrpwutckazhx.supabase.co/storage/v1/object/public/images/its-alive.jpg?t=2023-05-24T01%3A04%3A12.460Z)

# Ele vive! Meu Blog escrito com Obsidian e Next.js

## TL;DR
Minha jornada na criação do meu blog foi cheia de desafios e recompensas incríveis. Enfrentei obstáculos técnicos, mergulhei de cabeça nas tecnologias Next.js, Tailwind CSS, Contentlayer e Obsidian e finalmente alcancei o resultado desejado. Ver meu blog ganhar vida para compartilhar meus conhecimentos com a comunidade foi uma experiência gratificante e estimulante. Se você está pensando em embarcar nessa jornada de criação do seu próprio blog ou está em busca de motivação para enfrentar desafios pessoais, acredito que minha história irá inspirá-lo e ajudá-lo a seguir em frente. Não perca a oportunidade de aprender com meus desafios e descobertas, e mergulhe nessa jornada de crescimento e realização pessoal.

## Começo aqui
Olá leitores de artigos de tecnologia. É com imenso prazer que inicio minha jornada para compartilhar com vocês a história por trás da criação do meu tão idealizado blog. Meu nome é ==Thiago Murtinho==, e sou ==empreendedor e desenvolvedor== apaixonado por tecnologia. Durante anos, sou ávido consumidor de artigos de opinião e tutoriais em plataformas renomadas, como **Medium**, **Dev.to**, **Hashnode** e outros. Porém, nos últimos dois anos, essa paixão pela leitura evoluiu para um hobby diário e despertou em mim um desejo irresistível de contribuir com a comunidade.

Decidido a compartilhar meus conhecimentos e experiências, surgiu a ideia de criar meu próprio blog. Mas essa jornada não foi tão simples quanto eu imaginava. Desde a concepção da ideia até a conclusão do projeto, enfrentei uma série de desafios técnicos e pessoais que moldaram meu conhecimento significativamente, e **sem falar no fato que o projeto foi realizado em horas vagas e longas insônias crônicas.**

Nesse artigo não falarei de códigos, tutoriais nem implementações customizadas, mas contarei um corte dessa história e as tecnologias usadas. Nos próximos artigos vou me dedicar para apresentar em detalhes cada passo da implementação e solução de desafios.

## Configurando o ambiente: Um mergulho nas tecnologias escolhidas
Ao iniciar a jornada de criação do meu blog, segui a ideia de escrever com **Obsidian**, em um sub repositório contido no projeto, e usar todo o poder da ferramenta de anotações para gerenciar a parte de redação e com **Next.js expor o blog na ==Vercel== de forma ==gratuita==**. Uma das etapas fundamentais foi a configuração do ambiente de desenvolvimento, e foi nessa fase que tomei importantes decisões em relação às tecnologias que seriam utilizadas. Levando em consideração minha experiência profissional como desenvolvedor em uma empresa do ramo financeiro, onde utilizo a stack **Next.js, Tailwind CSS** e várias outras bibliotecas relacionadas a gráficos, tabelas e formulários, foi natural buscar algo similar.

- **Tudo começa no Obsidian - Criando templates e gerando frontmatter**:
Minha jornada começou no Obsidian, uma ferramenta poderosa para a criação de conteúdo. Para garantir consistência e eficiência na criação de novos artigos, criei templates personalizados e utilizei o **plugin ==Templater== para gerar automaticamente o frontmatter de cada post.**

- **Next.js - O poder da modernidade e eficiência**:
A escolha pelo **Next.js** foi motivada, em primeira instância, pela minha afinidade com esse framework. No entanto, sua modernidade e eficiência foram fatores determinantes para a seleção. Implementei o blog justamente durante o momento de transição para as novidades da **versão 13.4.x** e pretendo continuar atualizando com as mais recentes funcionalidades que o framework tem a oferecer.

- **Tailwind CSS - Uma faca de dois gumes, mas com cortes rápidos**:
O **Tailwind CSS** desperta amor e ódio dos desenvolvedores, pois, embora deixe o código extremamente verboso, é inegável que se trata de uma ferramenta de produtividade indiscutível para aqueles que sabem utilizar. Além disso, vale ressaltar que **se tornou o padrão de estilo para o Next.js a ==partir da versão 13.4.x.==** No meu caso, aproveitei para enriquecer o sistema com o uso de alguns plugins: ``tailwindcss-theme-swapper`` em conjunto com ``next-themes`` e ``@tailwindcss/typography``.

- **Contentlayer - A escolha meticulosa que atrasou tudo**:
A escolha do **Contentlayer** para lidar com a tradução de códigos **Markdown** para **HTML** foi um processo meticuloso e cheio de dúvidas. Testei outras opções, como a implementação padrão do ``next@mdx`` e o ``next-mdx-remote``, mas acabei optando pelo Contentlayer devido à sua documentação abrangente e a constante evolução que percebi na biblioteca. Além disso, não poderia deixar de mencionar o uso de plugins ==remark== e ==rehype== para aprimorar ainda mais o processo de conversão.

- **Configurando os plugins de remark e rehype - Enriquecendo o conteúdo**:
Durante o processo de configuração dos plugins de **remark** e **rehype** para enriquecer o conteúdo do meu blog, aproveitei os recursos disponíveis, como realce de sintaxe, estilização de syntax highlight em code blocks  e outros. Essa configuração exigiu experimentação e ajustes finos, e apesar da ampla variedade de plugins disponíveis, ainda precisei criar alguns personalizados para atender às necessidades específicas do projeto. Além disso, ao enfrentar problemas de formatação ao importar o conteúdo do **Obsidian**, tive que encontrar **soluções para remover ou customizar, ==automaticamente==**, elementos indesejados, como títulos, imagens de topo e rodapés, que não se encaixavam na estética do meu blog. Foi nesse contexto que fiz uso dos plugins personalizados de **remark** e **rehype**.

Além das tecnologias principais mencionadas acima, também utilizei outros pacotes para garantir que tudo se encaixasse perfeitamente em minha visão inicial. Cada escolha foi cuidadosamente feita, visando uma solução moderna e eficiente para meu blog. O uso do **==TypeScript== para adicionar segurança de tipagem ao desenvolvimento** também se destacou como indispensável. Essas escolhas técnicas refletem **minha busca por tecnologias ==modernas, eficientes e em constante evolução==**. E agora, munido com essa poderosa stack, estou pronto para enfrentar os desafios que estão por vir e compartilhar minhas experiências com vocês. 🎉

## Conclusão: Um marco na minha jornada e a satisfação pessoal
A criação do blog não foi apenas uma jornada de aprendizado técnico, mas também uma oportunidade de me conectar com a comunidade e aprimorar minhas habilidades de escrita e compartilhamento de conhecimento. Ao longo do processo, busquei recursos e documentações, aprendendo com outros desenvolvedores e encontrando soluções para os problemas que surgiram. Essas interações e aprendizados contínuos foram extremamente enriquecedores.

Para o futuro, ==pretendo continuar atualizando== e aprimorando meu blog. Tenho planos de adicionar recursos como **suporte a back-links do Obsidian, tags e grafos** relacionados aos artigos publicados. Além disso, desejo implementar o ==compartilhamento automático== para outras plataformas de blog, como **Dev.to**, e **otimizar o SEO** do blog para aumentar sua visibilidade e alcance.

Se você está pensando em iniciar seu próprio blog ou enfrentando desafios no desenvolvimento de projetos pessoais, espero que minha jornada inspire e motive você a seguir em frente. Lembre-se de que ==a jornada de desenvolvimento é contínua==, e estar aberto ao aprendizado constante é essencial. Não tenha medo de experimentar, testar novas tecnologias e explorar recursos adicionais que possam enriquecer sua experiência como desenvolvedor.

Boa sorte em sua jornada e que você possa alcançar seus objetivos e compartilhar seu conhecimento com a comunidade! 💪

---
tags: #blog #nextjs #tailwindcss #contentlayer
series: Ele vive! Meu Blog
