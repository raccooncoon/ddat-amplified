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
export declare type DropdownListUpdateFormInputValues = {
    tableNames?: string[];
};
export declare type DropdownListUpdateFormValidationValues = {
    tableNames?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DropdownListUpdateFormOverridesProps = {
    DropdownListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tableNames?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DropdownListUpdateFormProps = React.PropsWithChildren<{
    overrides?: DropdownListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    dropdownList?: any;
    onSubmit?: (fields: DropdownListUpdateFormInputValues) => DropdownListUpdateFormInputValues;
    onSuccess?: (fields: DropdownListUpdateFormInputValues) => void;
    onError?: (fields: DropdownListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DropdownListUpdateFormInputValues) => DropdownListUpdateFormInputValues;
    onValidate?: DropdownListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DropdownListUpdateForm(props: DropdownListUpdateFormProps): React.ReactElement;
