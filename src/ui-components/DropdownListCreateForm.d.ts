/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DropdownListCreateFormInputValues = {
    tableNames?: string[];
};
export declare type DropdownListCreateFormValidationValues = {
    tableNames?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DropdownListCreateFormOverridesProps = {
    DropdownListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tableNames?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DropdownListCreateFormProps = React.PropsWithChildren<{
    overrides?: DropdownListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DropdownListCreateFormInputValues) => DropdownListCreateFormInputValues;
    onSuccess?: (fields: DropdownListCreateFormInputValues) => void;
    onError?: (fields: DropdownListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DropdownListCreateFormInputValues) => DropdownListCreateFormInputValues;
    onValidate?: DropdownListCreateFormValidationValues;
} & React.CSSProperties>;
export default function DropdownListCreateForm(props: DropdownListCreateFormProps): React.ReactElement;
