import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormAtualizarAluno from "../../../components/Formularios/FormAtualizarAluno/FormAtualizarAluno";

function PAtualizarAluno(): JSX.Element {
    return (
        <>
            <Navegacao />
            <FormAtualizarAluno />
            <Rodape />
        </>
    );
}

export default PAtualizarAluno;
