/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getXmlModel } from "../graphql/queries";
import { updateXmlModel } from "../graphql/mutations";
const client = generateClient();
export default function XmlModelUpdateForm(props) {
  const {
    id: idProp,
    xmlModel: xmlModelModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    moduleName: "",
    xmlid: "",
    namespace: "",
    subtag: "",
    fileName: "",
    context: "",
    urlCount: "",
    owner: "",
  };
  const [moduleName, setModuleName] = React.useState(initialValues.moduleName);
  const [xmlid, setXmlid] = React.useState(initialValues.xmlid);
  const [namespace, setNamespace] = React.useState(initialValues.namespace);
  const [subtag, setSubtag] = React.useState(initialValues.subtag);
  const [fileName, setFileName] = React.useState(initialValues.fileName);
  const [context, setContext] = React.useState(initialValues.context);
  const [urlCount, setUrlCount] = React.useState(initialValues.urlCount);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = xmlModelRecord
      ? { ...initialValues, ...xmlModelRecord }
      : initialValues;
    setModuleName(cleanValues.moduleName);
    setXmlid(cleanValues.xmlid);
    setNamespace(cleanValues.namespace);
    setSubtag(cleanValues.subtag);
    setFileName(cleanValues.fileName);
    setContext(cleanValues.context);
    setUrlCount(cleanValues.urlCount);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [xmlModelRecord, setXmlModelRecord] = React.useState(xmlModelModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getXmlModel.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getXmlModel
        : xmlModelModelProp;
      setXmlModelRecord(record);
    };
    queryData();
  }, [idProp, xmlModelModelProp]);
  React.useEffect(resetStateValues, [xmlModelRecord]);
  const validations = {
    moduleName: [],
    xmlid: [],
    namespace: [],
    subtag: [],
    fileName: [],
    context: [],
    urlCount: [],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          moduleName: moduleName ?? null,
          xmlid: xmlid ?? null,
          namespace: namespace ?? null,
          subtag: subtag ?? null,
          fileName: fileName ?? null,
          context: context ?? null,
          urlCount: urlCount ?? null,
          owner: owner ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateXmlModel.replaceAll("__typename", ""),
            variables: {
              input: {
                id: xmlModelRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "XmlModelUpdateForm")}
      {...rest}
    >
      <TextField
        label="Module name"
        isRequired={false}
        isReadOnly={false}
        value={moduleName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName: value,
              xmlid,
              namespace,
              subtag,
              fileName,
              context,
              urlCount,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.moduleName ?? value;
          }
          if (errors.moduleName?.hasError) {
            runValidationTasks("moduleName", value);
          }
          setModuleName(value);
        }}
        onBlur={() => runValidationTasks("moduleName", moduleName)}
        errorMessage={errors.moduleName?.errorMessage}
        hasError={errors.moduleName?.hasError}
        {...getOverrideProps(overrides, "moduleName")}
      ></TextField>
      <TextField
        label="Xmlid"
        isRequired={false}
        isReadOnly={false}
        value={xmlid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid: value,
              namespace,
              subtag,
              fileName,
              context,
              urlCount,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.xmlid ?? value;
          }
          if (errors.xmlid?.hasError) {
            runValidationTasks("xmlid", value);
          }
          setXmlid(value);
        }}
        onBlur={() => runValidationTasks("xmlid", xmlid)}
        errorMessage={errors.xmlid?.errorMessage}
        hasError={errors.xmlid?.hasError}
        {...getOverrideProps(overrides, "xmlid")}
      ></TextField>
      <TextField
        label="Namespace"
        isRequired={false}
        isReadOnly={false}
        value={namespace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid,
              namespace: value,
              subtag,
              fileName,
              context,
              urlCount,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.namespace ?? value;
          }
          if (errors.namespace?.hasError) {
            runValidationTasks("namespace", value);
          }
          setNamespace(value);
        }}
        onBlur={() => runValidationTasks("namespace", namespace)}
        errorMessage={errors.namespace?.errorMessage}
        hasError={errors.namespace?.hasError}
        {...getOverrideProps(overrides, "namespace")}
      ></TextField>
      <TextField
        label="Subtag"
        isRequired={false}
        isReadOnly={false}
        value={subtag}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid,
              namespace,
              subtag: value,
              fileName,
              context,
              urlCount,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.subtag ?? value;
          }
          if (errors.subtag?.hasError) {
            runValidationTasks("subtag", value);
          }
          setSubtag(value);
        }}
        onBlur={() => runValidationTasks("subtag", subtag)}
        errorMessage={errors.subtag?.errorMessage}
        hasError={errors.subtag?.hasError}
        {...getOverrideProps(overrides, "subtag")}
      ></TextField>
      <TextField
        label="File name"
        isRequired={false}
        isReadOnly={false}
        value={fileName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid,
              namespace,
              subtag,
              fileName: value,
              context,
              urlCount,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.fileName ?? value;
          }
          if (errors.fileName?.hasError) {
            runValidationTasks("fileName", value);
          }
          setFileName(value);
        }}
        onBlur={() => runValidationTasks("fileName", fileName)}
        errorMessage={errors.fileName?.errorMessage}
        hasError={errors.fileName?.hasError}
        {...getOverrideProps(overrides, "fileName")}
      ></TextField>
      <TextField
        label="Context"
        isRequired={false}
        isReadOnly={false}
        value={context}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid,
              namespace,
              subtag,
              fileName,
              context: value,
              urlCount,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.context ?? value;
          }
          if (errors.context?.hasError) {
            runValidationTasks("context", value);
          }
          setContext(value);
        }}
        onBlur={() => runValidationTasks("context", context)}
        errorMessage={errors.context?.errorMessage}
        hasError={errors.context?.hasError}
        {...getOverrideProps(overrides, "context")}
      ></TextField>
      <TextField
        label="Url count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={urlCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid,
              namespace,
              subtag,
              fileName,
              context,
              urlCount: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.urlCount ?? value;
          }
          if (errors.urlCount?.hasError) {
            runValidationTasks("urlCount", value);
          }
          setUrlCount(value);
        }}
        onBlur={() => runValidationTasks("urlCount", urlCount)}
        errorMessage={errors.urlCount?.errorMessage}
        hasError={errors.urlCount?.hasError}
        {...getOverrideProps(overrides, "urlCount")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              moduleName,
              xmlid,
              namespace,
              subtag,
              fileName,
              context,
              urlCount,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || xmlModelModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || xmlModelModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
