import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormLivro from "../../../components/Formularios/FormLivro/FormLivro";

function PCadastroLivro(): JSX.Element {
    return(
        <>
            <Navegacao />
            <FormLivro />
            <Rodape />
        </>
    );
}

export default PCadastroLivro;
