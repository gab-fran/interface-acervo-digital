import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PLivros(): JSX.Element {
    return (
        <div className="pagina">
            <Navegacao/>
            <div className="pagina-conteudo">
                <p>Livros</p>
            </div>
            <Rodape />
        </div>
    );
}

export default PLivros;