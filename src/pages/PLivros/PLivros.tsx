import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PLivros(): JSX.Element {
    return (
        <>
            <Navegacao/>
            <p>Livros</p>
            <Rodape />
        </>
    );
}

export default PLivros;