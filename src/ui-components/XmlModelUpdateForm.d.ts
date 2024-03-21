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
export declare type XmlModelUpdateFormInputValues = {
    moduleName?: string;
    xmlid?: string;
    namespace?: string;
    subtag?: string;
    fileName?: string;
    context?: string;
    urlCount?: number;
    owner?: string;
};
export declare type XmlModelUpdateFormValidationValues = {
    moduleName?: ValidationFunction<string>;
    xmlid?: ValidationFunction<string>;
    namespace?: ValidationFunction<string>;
    subtag?: ValidationFunction<string>;
    fileName?: ValidationFunction<string>;
    context?: ValidationFunction<string>;
    urlCount?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type XmlModelUpdateFormOverridesProps = {
    XmlModelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    moduleName?: PrimitiveOverrideProps<TextFieldProps>;
    xmlid?: PrimitiveOverrideProps<TextFieldProps>;
    namespace?: PrimitiveOverrideProps<TextFieldProps>;
    subtag?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    context?: PrimitiveOverrideProps<TextFieldProps>;
    urlCount?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type XmlModelUpdateFormProps = React.PropsWithChildren<{
    overrides?: XmlModelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    xmlModel?: any;
    onSubmit?: (fields: XmlModelUpdateFormInputValues) => XmlModelUpdateFormInputValues;
    onSuccess?: (fields: XmlModelUpdateFormInputValues) => void;
    onError?: (fields: XmlModelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: XmlModelUpdateFormInputValues) => XmlModelUpdateFormInputValues;
    onValidate?: XmlModelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function XmlModelUpdateForm(props: XmlModelUpdateFormProps): React.ReactElement;
