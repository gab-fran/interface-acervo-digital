import type { JSX, ReactNode } from "react";
import { cx, ui } from "./styles";

interface CampoFormularioProps {
    htmlFor: string;
    label: string;
    children: ReactNode;
    className?: string;
    helperText?: string;
}

function CampoFormulario({ htmlFor, label, children, className, helperText }: CampoFormularioProps): JSX.Element {
    return (
        <div className={cx("min-w-0", className)}>
            <label htmlFor={htmlFor} className={ui.label}>
                {label}
            </label>
            {children}
            {helperText && (
                <p className="mt-2 text-xs font-medium text-slate-500">
                    {helperText}
                </p>
            )}
        </div>
    );
}

export default CampoFormulario;
