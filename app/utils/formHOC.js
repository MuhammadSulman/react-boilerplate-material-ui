/* eslint-disable react/prop-types */
import React from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    Checkbox,
    DatePicker,
    Pagination,
    Slider,
    Upload,
    Icon,
    message,
} from 'antd';
import moment from "moment";
import ReactQuill from "react-quill";
import {APP_DATE_DISPLAY_FORMAT} from "./constants";


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Search } = Input;

var formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const makeField = Component => ({
                                    input,
                                    meta,
                                    children,
                                    hasFeedback,
                                    label,
                                    labelRight,
                                    ...rest
                                }) => {
    const hasError = meta.touched && meta.invalid;
    if(!label){
        formItemLayout = {};
    }

    return (
        <div>
            <FormItem
                {...formItemLayout}
                label={label}
                validateStatus={hasError ? 'error' : 'success'}
                hasFeedback={hasFeedback && hasError}
                help={hasError && meta.error}
            >
                <Component {...input} {...rest}>
                    {children}
                </Component>

                {labelRight && (
                    <span style={{ color: (rest.disabled && '#5a5a5a') || '#9e9e9e' }}>
          {labelRight}
        </span>
                )}
            </FormItem>
        </div>
    );
};

const makeSliderField = Component => ({
                                          input,
                                          meta,
                                          children,
                                          hasFeedback,
                                          label,
                                          labelRight,
                                          ...rest
                                      }) => {
    /* eslint-disable no-param-reassign */
    if (!input.value) input.value = 0;
    const hasError = (meta.touched && meta.invalid);
    return (
        <FormItem
            label={label}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
            style={{ marginBottom: 0 }}
        >
            <Component {...input} {...rest}>
                {children}
            </Component>
            {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
        </FormItem>
    );
};

const makeSelectField = Component => ({
                                          input,
                                          meta,
                                          children,
                                          hasFeedback,
                                          label,
                                          labelRight,
                                          ...rest
                                      }) => {
    /* eslint-disable no-param-reassign */
    if (input.value !== 0 && !input.value) {
        input.value = undefined;
    }
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component
                {...input}
                {...rest}
                style={{
                    color:
                        (!input.value && input.value !== 0) || rest.disabled
                            ? '#5a5a5a'
                            : 'white',
                }}
            >
                {children}
            </Component>
            {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
        </FormItem>
    );
};

const makeDateField = Component => ({
                                        input,
                                        meta,
                                        children,
                                        hasFeedback,
                                        label,
                                        labelRight,
                                        ...rest
                                    }) => {
    /* eslint-disable no-underscore-dangle */
    const hasError = meta.touched && meta.invalid;
    // console.log(typeof input.value, input.value, "????")
    let value = moment();
    // if (!input.value || (!input.value._isValid && (typeof input.value === 'object' || input.value instanceof Object))){
    //   value = "";
    // }
    // else if (typeof input.value === 'string' || input.value instanceof String) {
    //   console.log("string aya")
    //   value = moment(input.value)
    // } else {
    //   value = input.value;
    // }
    input = {
        ...input,
        value: input.value && input.value._isValid ? moment(input.value) : moment(),

    };
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component
                {...input} {...rest}
                format={APP_DATE_DISPLAY_FORMAT}
                onChange={(event, value) => input.onChange(event)}
                onBlur={(event, value) => input.onBlur(value) }
            >
                {children}
            </Component>
            {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
        </FormItem>
    );
};

const makeEditorField = Component => ({
                                          input,
                                          meta,
                                          children,
                                          hasFeedback,
                                          label,
                                          labelRight,
                                          ...rest
                                      }) => {
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...input} {...rest}
                       onBlur={(range, source, quill) => {
                           input.onBlur(quill.getHTML());
                       }}
            >
                {children}
            </Component>
            {labelRight && (
                <span style={{ color: (rest.disabled && '#5a5a5a') || '#9e9e9e' }}>
          {labelRight}
        </span>
            )}
        </FormItem>
    );
};

const makeFileUploadField = Component => ({
                                              input,
                                              meta,
                                              children,
                                              hasFeedback,
                                              ...rest
                                          }) => {

    let data = {};
    let loading = false;
    if(rest.selector){
        const selector = rest.selector;
        loading = selector.loading;
        data = selector.data;
    }
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">{rest.placeholder}</div>
        </div>
    );

    const hasError = meta.touched && meta.invalid;

    return (
        <FormItem
            {...formItemLayout}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component
                {...input}
                {...rest}

                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file) => {
                    const isJPG = file.type === 'image/jpeg';
                    if (!isJPG) {
                        message.error('You can only upload JPG file!');
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                        message.error('Image must smaller than 2MB!');
                    }
                    return isJPG && isLt2M;
                }}
                onChange={(info) => {if(info.file.status === 'uploading') { loading: true} return }}
            >
                {data.url ? <img style={{height: rest.height, width: rest.width}} src={data.url} alt="avatar" /> : uploadButton}

            </Component>

        </FormItem>
    );
};

export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeSelectField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextArea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
export const ADatePicker = makeDateField(DatePicker);
export const ASearch = makeField(Search);
export const ASlider = makeSliderField(Slider);
export const AEditor= makeEditorField(ReactQuill);
export const AFileUpload= makeFileUploadField(Upload);
export const ReduxPagination = ({ input, ...rest }) => (
    <Pagination
        name={input.name}
        onChange={page => input.onChange(page)}
        current={input.value}
        {...rest}
    />
);
