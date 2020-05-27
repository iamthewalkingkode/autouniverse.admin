/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, notification, Input } from 'antd';
import * as func from '../../../providers/functions';

const MechanicUploadScreen = props => {
    const { form: { validateFields, resetFields }, visible } = props;

    const [file, setFile] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setModalTitle('Mass upload mechanics');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formChange = (e) => {
        var target = e.target.files[0];
        var fileInput = document.getElementById('file');
        var image = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function (r) {
            setFile(target);
        }
        reader.readAsDataURL(image);
    }

    const submit = e => {
        e.preventDefault();
        validateFields((err, v) => {
            if (!err) {
                setErrMessage('');
                setSubmitting(true);
                func.postFile(`mechanics/uploads`, { file }).then((res) => {
                    setSubmitting(false);
                    console.log(res)
                    if (res.status === 200) {
                        props.onOK('post', res.data);
                        props.onCancel();
                        resetFields();
                        notification.success({ message: res.message });
                    } else {
                        if (res.status === 412) {
                            setErrMessage(res.data.join('<br />'));
                        } else {
                            setErrMessage(res.message);
                        }
                    }
                });
            }
        });
    }

    return (
        <Modal visible={visible} title={modalTitle} onCancel={() => props.onCancel()} destroyOnClose={true} width={600} maskClosable={false}
            footer={[
                <Button key="back" type="danger" className="pull-left" disabled={submitting} onClick={() => props.onCancel()}>
                    Close
                </Button>,
                <Button key="submit" type="dark" disabled={file ? false : true} loading={submitting} onClick={submit}>
                    Upload
                </Button>
            ]}
            style={{ top: 20 }} className={`${errMessage ? 'animated shake' : ''}`}
        >
            <Form hideRequiredMark={false}>
                {errMessage && (<div className="alert alert-danger" dangerouslySetInnerHTML={{ __html: errMessage }} />)}
                <div className="alert alert-info pd-5 text-center">
                    <a href={`${window.location.host}/assets/sample.mechanics.csv`} target="_blank" rel="noopener noreferrer">Download sample template here</a>
                </div>

                <Input id="file" className="form-controls" type="file" onChange={formChange} />
            </Form>
        </Modal>
    );

};

const MechanicUpload = Form.create()(MechanicUploadScreen);
export default MechanicUpload;