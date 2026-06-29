const { Transform } = require('stream');

class LogToJsonStream extends Transform {
    constructor() {
        super();

        this.buffer = '';
        this.logs = [];
    }

    _transform(chunk, encoding, callback) {

        this.buffer += chunk.toString();

        const linhas = this.buffer.split('\n');

        this.buffer = linhas.pop();

        linhas.forEach(linha => {

            linha = linha.trim();

            if (!linha) return;

            const match = linha.match(
                /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+(INFO|ERRO)\s+(.*)$/
            );

            if (match) {

                this.logs.push({
                    data: match[1],
                    nivel: match[2],
                    mensagem: match[3]
                });

            }

        });

        callback();

    }

    _flush(callback) {

        if (this.buffer.trim()) {

            const match = this.buffer.match(
                /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+(INFO|ERRO)\s+(.*)$/
            );

            if (match) {

                this.logs.push({
                    data: match[1],
                    nivel: match[2],
                    mensagem: match[3]
                });

            }

        }

        const json = JSON.stringify(this.logs, null, 2);

        JSON.parse(json);

        this.push(json);

        callback();

    }

}

module.exports = LogToJsonStream;