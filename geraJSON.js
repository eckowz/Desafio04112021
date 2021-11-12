const fs = require('fs')
var idCompraComErro = []
var regComErro = []

function converteArqParaJSON(e){
    var temp2 = e.replace(/'/g,'').replace(/""/g,'"').replace(/}}"/g,'}}').split('\n').slice(1,-1)
    for (let i = 0; i < temp2.length; i++) {
        temp2[i] = temp2[i].split(' ').pop()
    }
    temp2 = temp2.join(separator = ',')
    var meujson = '{ "Registros": ['
    meujson = meujson+temp2.concat(']}') // nesse ponto termina a conversão de CSV pra JSON
    return meujson
}

try { // armazena transacao com erro em regComErro
    var temp1 = fs.readFileSync('response-reverse-logs.csv', 'utf8')
    temp1 = converteArqParaJSON(temp1)
    var obj = JSON.parse(temp1)
    for (let i = 0; i < obj.Registros.length; i++) {
        if (obj.Registros[i].Response.code == 1) {
            regComErro.push(obj.Registros[i]) 
        }    
    }
    console.log('Arquivo 1 lido e registros com erro armazenados.')
    } catch (err) {
    console.error(err)
}

try { //armazena registros com erro quando o CorrelationId for igual
    var temp1 = fs.readFileSync('reverse-logs.csv', 'utf8')
    temp1 = converteArqParaJSON(temp1)
    var obj = JSON.parse(temp1)

    for (let i = 0; i < regComErro.length; i++) {
        for (let ii = 0; ii < obj.Registros.length; ii++) {
            if (regComErro[i].CorrelationId === obj.Registros[ii].CorrelationId) {
                idCompraComErro.push(obj.Registros[ii])
                //idCompraComErro.push(obj.Registros[ii].Payload)
            }   
        } 
    }
    console.log('Arquivo 2 lido e registros com erro armazenados.')
    } catch (err) {
    console.error(err)
}

try {
    let dadosConvertidos=JSON.stringify(idCompraComErro, null, 2)
    fs.writeFileSync('transacoes_com_erro.json', dadosConvertidos)
    console.log('JSON criado com sucesso.')
} catch (err) {
    console.error(err)
}
