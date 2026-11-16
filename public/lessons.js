const lessons = [
  {
    id: 'primeiro-dia', icon: 'box', topic: 'Fundamentos', time: 8, title: 'Primeiro dia no almoxarifado',
    summary: 'Conheça a rotina, os endereços de estoque e os documentos que acompanham cada material.',
    sections: [
      ['Antes da primeira tarefa', 'Apresente-se ao responsável e confirme sua atividade, as áreas permitidas, a sinalização e quem recebe relatos de divergência. Peça para acompanhar uma conferência completa antes de trabalhar sozinho.'],
      ['Identificação e endereço', 'O código distingue itens parecidos. O endereço indica a localização física, como rua, estante, nível e posição. A etiqueta também pode informar unidade, lote ou número de série. Confirme cada campo com o cadastro antes de movimentar o item.'],
      ['Do recebimento à expedição', 'No recebimento, confira documento, código, quantidade, unidade e condição da embalagem. Armazene no endereço indicado. Na saída, separe por requisição e confirme a entrega com registro. Isole e comunique itens avariados conforme o fluxo local.']
    ],
    quiz: ['A descrição parece correta, mas o código da etiqueta difere do documento. O que você faz?', ['Recebo pelo nome do item', 'Pauso a conferência e peço validação', 'Troco a etiqueta por conta própria'], 1, 'Descrições semelhantes podem representar especificações diferentes. A divergência deve ser esclarecida antes da entrada.']
  },
  {
    id: 'contagem', icon: 'list', topic: 'Estoque', time: 10, title: 'Contagem e apontamento',
    summary: 'Conte por endereço e registre quantidades, unidades e ocorrências com rastreabilidade.',
    sections: [
      ['Prepare a contagem', 'Confirme o endereço, o código, a unidade e o recorte de estoque. Separe materiais de códigos, lotes ou condições diferentes. Em contagem cega, registre o físico sem consultar o saldo esperado.'],
      ['Registre o que encontrou', 'Apontamento é o registro da quantidade ou ocorrência observada. Anote documento de referência, código, endereço, unidade, lote ou série aplicável, quantidade e observação. Diferencie zero contado de item ainda pendente.'],
      ['Evite conversões por suposição', 'Se há duas caixas com 12 conectores cada e três conectores soltos, são 27 unidades quando a embalagem de 12 foi confirmada. Se o cadastro usa caixa ou o conteúdo é desconhecido, esclareça a conversão antes do lançamento.']
    ],
    quiz: ['Há 3 caixas de 10 peças verificadas e 4 peças soltas. O cadastro usa unidade. Qual é a quantidade?', ['7 unidades', '30 unidades', '34 unidades'], 2, 'Multiplique as caixas pelo conteúdo confirmado e some as unidades soltas.']
  },
  {
    id: 'inventario', icon: 'chart', topic: 'Estoque', time: 12, title: 'Inventário e divergências',
    summary: 'Compare físico e sistema, investigue diferenças e acompanhe os indicadores do estoque.',
    sections: [
      ['Inventário geral e rotativo', 'O geral abrange o recorte definido para um período. O rotativo distribui contagens ao longo do tempo. Combine o horário de referência e o tratamento de entradas e saídas ocorridas durante a contagem.'],
      ['Apure e investigue', 'Calcule físico menos saldo de referência. Se o sistema mostra 120 e o físico é 116, a diferença é −4. Confira unidade, endereço, lote e movimentos pendentes ou duplicados. Registre a evidência e solicite recontagem conforme o fluxo.'],
      ['Separe contagem de ajuste', 'A contagem registra o resultado físico. O ajuste altera o saldo e segue a aprovação aplicável. Para acompanhar a acurácia por item, divida os itens sem diferença pelos itens contados no mesmo recorte. Em 48 de 50, a acurácia é 96%.']
    ],
    quiz: ['O saldo de referência é 48 unidades e o físico é 45. Como registrar a diferença?', ['−3 unidades', '+3 unidades', '0 unidades'], 0, '45 menos 48 é −3. Documente a diferença antes de qualquer ajuste autorizado.']
  },
  {
    id: 'sap', icon: 'system', topic: 'ERP', time: 12, title: 'SAP para almoxarifado',
    summary: 'Entenda estoque no MM-IM, endereços no WM/EWM e o fluxo do inventário físico.',
    sections: [
      ['MM-IM e estrutura de estoque', 'O SAP MM-IM gerencia movimentos e saldos de materiais. Centro e depósito ajudam a localizar o saldo na estrutura organizacional. Lote, tipo de estoque e unidade podem mudar qual saldo deve ser consultado.'],
      ['WM e EWM', 'Quando implantados, WM ou EWM podem controlar a operação em posições físicas e usar documentos e tarefas próprias. Um saldo disponível no depósito não indica sozinho qual posição deve ser usada na separação.'],
      ['Fluxo de inventário', 'No MM-IM, use o documento de inventário como referência. Registre a quantidade contada, revise as diferenças e faça recontagem quando aplicável. A contabilização de diferenças é uma etapa que pode gerar documentos e alterar estoque. Telas e permissões variam conforme a implantação.']
    ],
    link: ['Processo de inventário físico no SAP', 'https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/2761bd534f22b44ce10000000a174cb4.html'],
    quiz: ['Qual etapa altera o saldo ao encerrar uma diferença validada?', ['Registrar a contagem', 'Consultar o endereço', 'Contabilizar a diferença'], 2, 'A contabilização da diferença efetiva a correção de estoque no cenário estudado.']
  },
  {
    id: 'totvs', icon: 'system', topic: 'ERP', time: 12, title: 'TOTVS Protheus',
    summary: 'Veja como o SIGAEST registra contagens, confere diferenças e processa ajustes.',
    sections: [
      ['Mapeie a operação no SIGAEST', 'No Protheus, confira filial, armazém, produto e unidade de medida. Endereço, lote e outros controles podem depender do cadastro e dos parâmetros em uso.'],
      ['Da lista à conferência', 'O fluxo padrão documentado pela TOTVS inclui etiquetas (MATR270), lista de produtos (MATR280), digitação do inventário (MATA270) e conferência de diferenças (MATR285). Valide com a equipe o fluxo da sua versão.'],
      ['Acerto de inventário', 'A rotina MATA340 é citada no fluxo padrão de acerto, após conferência das diferenças. Exemplo fictício: digite 31 unidades contadas para o produto de estudo, confira a diferença contra 33 e encaminhe a pendência ao responsável pelo acerto.']
    ],
    link: ['Processo padrão de inventário no Protheus', 'https://centraldeatendimento.totvs.com/hc/pt-br/articles/360049739614-Cross-Segmento-Backoffice-Linha-Protheus-SIGAEST-MATA340-Processo-padr%C3%A3o-para-Inventariar-produtos-no-Estoque'],
    quiz: ['Qual rotina do fluxo padrão é usada para digitar a contagem?', ['MATA270', 'MATR285', 'MATA340'], 0, 'MATA270 registra a contagem. MATR285 apoia a conferência e MATA340 trata o acerto.']
  },
  {
    id: 'materiais', icon: 'bolt', topic: 'Energia', time: 10, title: 'Materiais de distribuição',
    summary: 'Reconheça cabos, conectores, isoladores, medidores e transformadores no estoque.',
    sections: [
      ['Cabos e bobinas', 'Compare tipo, seção nominal, classe de tensão indicada, identificação de bobina e unidade do cadastro. O comprimento pode ser controlado em metros. Preserve a identificação ao registrar sobras.'],
      ['Conectores, isoladores e ferragens', 'Conectores unem condutores conforme aplicação especificada. Isoladores sustentam condutores e os isolam de estruturas. Ferragens apoiam fixação e sustentação. Compare código e especificação mesmo quando o formato é parecido.'],
      ['Equipamentos rastreáveis', 'Medidores registram consumo. Transformadores modificam níveis de tensão. Quando houver controle por série, vincule a identificação individual ao movimento. Para volumes pesados, siga a movimentação prevista e acione quem tem autorização.']
    ],
    quiz: ['Dois conectores parecem iguais, mas têm códigos diferentes. Qual dado deve orientar a separação?', ['A aparência', 'A cor da embalagem', 'O código e a especificação da requisição'], 2, 'Identifique o material pelo código e pela especificação para evitar trocar itens visualmente semelhantes.']
  },
  {
    id: 'seguranca', icon: 'shield', topic: 'Energia', time: 10, title: 'Segurança na operação',
    summary: 'Reconheça riscos do almoxarifado e saiba quando interromper a tarefa e avisar a equipe.',
    sections: [
      ['Circulação e cargas', 'A NR-11 trata de transporte, movimentação, armazenagem e manuseio. Respeite rotas de pedestres, áreas isoladas e limites indicados. Se encontrar uma carga instável ou uma bobina sem contenção, mantenha distância e comunique o responsável.'],
      ['Proteção individual', 'A NR-6 trata de EPI. Confirme quais equipamentos são exigidos para a tarefa, receba orientação de uso e comunique dano ou perda antes de prosseguir.'],
      ['Risco elétrico', 'A NR-10 trata da segurança em instalações e serviços com eletricidade. Diante de suspeita de energização ou avaria elétrica, interrompa a tarefa, mantenha distância e acione o responsável conforme o procedimento local. Este conteúdo é introdutório e não substitui treinamento ou autorização.']
    ],
    link: ['Normas Regulamentadoras vigentes do MTE', 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/normas-regulamentadoras-nrs'],
    quiz: ['Você encontra uma bobina pesada em posição instável. Qual é a primeira ação?', ['Tentar segurar a bobina', 'Interromper a tarefa, manter distância e avisar', 'Passar depressa pelo local'], 1, 'Mantenha distância e avise a equipe responsável para que o risco seja tratado pelo procedimento local.']
  }
];

const scenarios = [
  { item: 'Conector de compressão', code: 'DEMO-014', location: 'A-02-03', unit: 'un', balance: 40, count: 38, evidence: 'Você contou 3 caixas conferidas de 12 unidades e 2 unidades avulsas.' },
  { item: 'Isolador polimérico', code: 'DEMO-027', location: 'B-01-02', unit: 'un', balance: 24, count: 24, evidence: 'Você contou 4 volumes completos de 6 peças cada.' },
  { item: 'Cabo de alumínio', code: 'DEMO-051', location: 'P-01-04', unit: 'm', balance: 160, count: 175, evidence: 'A medição registrada em duas bobinas identificadas indica 100 m e 75 m.' }
];
