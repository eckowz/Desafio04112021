# Desafio
> O objetivo do desafio é gerar um JSON com todos os registros de compra que apresentaram erro.

## O que foi feito:
1. O arquivo de texto "response-reverse-logs.csv" foi transformado em JSON e então parseado para se tornar um objeto.
2. O campo "CorrelationId" foi armazenado em todos os casos onde o Response code fosse igual a 1(erro).
3. Foi repetido o processo 1 para o arquivo "reverse-logs.csv".
4. Foi armazenado o registro completo de todos os casos onde o "CorrelationId" do segundo arquivo coincidisse com o armazenado anteriormente.
5. Os registros armazenados do arquivo 2 foram transformados em um JSON com o nome "transacoes_com_erro.json"

## Extra:
* Todos os processos anteriores foram desenvolvidos para serem realizados em ambiente dev com a utilização do Node.JS. e pensando na necessidade de um usuario sem acesso a ferramenta precisar realizar a geração do arquivo JSON, foi feita uma pagina HTML(sem CSS por questões de simplicidade) com toda a funcionalidade e suas devidas adaptações no código para execução diretamente via browser e com a seleção manual dos arquivos.
