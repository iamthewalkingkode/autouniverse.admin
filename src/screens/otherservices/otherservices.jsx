import React, { Component } from 'react';
import { Button, Form, Input, Select, Pagination, Popconfirm, notification } from 'antd';
import * as func from '../../providers/functions';
import moment from 'moment';

import { MassUpload } from '../../components';
import OtherServicesForm from './components/otherservices.form';

const limit = 12;
const defaultImage = '/assets/noimage.jpg';
const rowStatus = [['warning', 'Not active'], ['success', 'Active'], ['danger', 'Deleted']];

class OtherServices extends Component {

    state = {
        loading: false, formModal: false, uploadModal: false,
        data: [], categories: [], row: {}, pathname: '', edited: 0, manipulate: 0,
        istatus: '%', iname: '', icategory: '%',
        step: 0, currentStep: 1, total: 0
    }

    componentDidMount() {
        this.setPage();
    }

    setPage() {
        this.props.setPageTitle('Other Services');
        this.getData();
    }

    filter = () => {
        this.setState({ step: 0, currentStep: 1, edited: 0 }, () => {
            this.getData();
        });
    }
    getData = () => {
        this.setState({ loading: true, total: 0 });
        const { istatus, iname, icategory, step } = this.state;
        func.get('otherservices', { name: `%${iname}%`, category: icategory, limit: `${step},${limit}`, status: istatus }).then(res => {
            this.setState({ loading: false });
            if (res.status === 200) {
                this.setState({ data: res.data, total: res.count });
            } else {
                this.setState({ data: [] });
            }
        });

        func.get('otherservices-categories', { status: 1, orderby: 'name_asc' }).then(res => {
            if (res.status === 200) {
                this.setState({ categories: res.data });
            }
        });
    }

    formChange = (e, name) => {
        name = name || e.target.name;
        let value = e.target ? e.target.value : e;
        this.setState({ [name]: value });
    }
    nextPrev = (e) => {
        this.setState({ currentStep: e, step: (e - 1) * limit, edited: 0 }, () => {
            this.getData();
        });
    }

    delete = (row) => {
        const { uuid } = row;
        this.setState({ submitting: true, edited: 0 });
        func.delte(`otherservices/${row.uuid}`).then((res) => {
            this.setState({ submitting: false });
            if (res.status === 200) {
                this.setState({ data: this.state.data.filter(row => row.uuid !== uuid) });
                notification.success({ message: res.message });
            } else {
                notification.error({ message: res.message });
            }
        });
    }

    render() {
        let i = this.state.step + 1;
        const { loading, data, submitting, total, currentStep, edited, istatus, categories } = this.state;

        return (
            <React.Fragment>
                <div className="card" style={{ marginBottom: 20 }}>
                    <div className="card-body">
                        <div className="jumbotron">
                            <Form hideRequiredMark={false}>
                                <div className="row row-xs">
                                    <div className="col-2">
                                        <Select showSearch={true} placeholder="Status" value={istatus} disabled={loading} onChange={e => this.formChange(e, 'istatus')}>
                                            <Select.Option value={'%'}>All status</Select.Option>
                                            <Select.Option value={1}>Active</Select.Option>
                                            <Select.Option value={0}>Inactive</Select.Option>
                                        </Select>
                                    </div>
                                    <div className="col-2">
                                        <Input placeholder="Search by name" disabled={loading} onPressEnter={this.filter} onChange={e => this.formChange(e, 'iname')} />
                                    </div>
                                    <div className="col-2">
                                        <Select autoComplete="off" showSearch disabled={loading} value={this.state.icategory} onChange={e => this.formChange(e, 'icategory')}>
                                            <Select.Option value={'%'}>All categories</Select.Option>
                                            {categories.map(ctg => (
                                                <Select.Option value={ctg.uuid} key={ctg.uuid}>{ctg.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-2">
                                        <Button type="primary" size="small" loading={loading} onClick={this.filter}>Search</Button>
                                    </div>
                                    <div className="col-4 text-right">
                                        {func.hasR('oth_add') && (
                                            <Button type="dark" size="small" className="mg-r-5" onClick={() => this.setState({ row: {}, formModal: true })}><i className="icon-plus"></i> &nbsp; Add new</Button>
                                        )}
                                        {func.hasR('oth_up') && (
                                            <Button type="dark" size="small" className="mg-r-5" onClick={() => this.setState({ row: {}, uploadModal: true })}>
                                                <i className="icon-cloud-upload"></i> &nbsp; Mass upload
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Contact person</th>
                                        <th>Details</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading === true && (<tr><td align="center" colSpan="15"><i className="fa fa-spin fa-spinner"></i> loading...</td></tr>)}
                                    {loading === false && data.length === 0 && (<tr><td align="center" colSpan="15">No records found</td></tr>)}

                                    {loading === false && (
                                        data.map((row) => (
                                            <tr key={row.uuid} className={edited === row.uuid ? 'animated shake bg-gray-100' : ''}>
                                                <td>{i++}</td>
                                                <td><img className="img-thumbnail" width="80px" src={row.images ? row.image_links[0] : defaultImage} alt={row.name} /></td>
                                                <td>{row.name}</td>
                                                <td>{row.category.name}</td>
                                                <td>
                                                    Name: {row.contact_name} <br />
                                                    Phone: {row.contact_phones}
                                                </td>
                                                <td>
                                                    Location: {row.location.region} / {row.location.city} / {row.location.area} <br />
                                                    Rating: {row.rating} <br />
                                                    Certifications: {row.certifications} <br />
                                                    Makes: {row.makes}
                                                </td>
                                                <td><label className={`badge badge-${rowStatus[row.status][0]}`}>{rowStatus[row.status][1]}</label></td>
                                                <td>{moment(row.crdate).format('LLL')}</td>
                                                <td align="right">
                                                    {row.status !== 2 && func.hasR('oth_upd') && (
                                                        <Button type="dark" size="small" loading={submitting} onClick={() => this.setState({ row, formModal: true })}>Edit</Button>
                                                    )}
                                                    {' '}
                                                    {func.hasR('oth_del') && (
                                                        <Popconfirm title="Are you sure?" okText="Yes, Delete" okButtonProps={{ type: 'danger', size: 'small' }} onConfirm={() => this.delete(row)}>
                                                            <Button type="danger" size="small" loading={submitting}>Delete</Button>
                                                        </Popconfirm>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            {!loading && total > limit && (<Pagination total={total} pageSize={limit} current={currentStep} onChange={(e) => this.nextPrev(e)} />)}
                        </div>
                    </div>
                </div>


                {this.state.formModal === true && (
                    <OtherServicesForm
                        {...this.props}
                        row={this.state.row}
                        visible={this.state.formModal}
                        categories={this.state.categories}
                        onCancel={() => this.setState({ row: {}, formModal: false })}
                        onOK={(a, e) => {
                            this.setState({ edited: 0 });
                            setTimeout(() => {
                                if (a === 'put') {
                                    let i = data.indexOf(data.filter(row => row.uuid === e.uuid)[0]);
                                    data[i] = e;
                                    this.setState({ data, edited: e.uuid });
                                } else {
                                    data.unshift(e);
                                    this.setState({ data, edited: e.uuid });
                                }
                            }, 200);
                        }}
                    />
                )}

                {this.state.uploadModal === true && (
                    <MassUpload
                        {...this.props}
                        module="otherservices"
                        row={this.state.row}
                        visible={this.state.uploadModal}
                        onCancel={() => this.setState({ row: {}, uploadModal: false })}
                        onOK={(a, e) => {
                            this.getData();
                        }}
                    />
                )}

            </React.Fragment>
        );
    }
}

export default OtherServices;