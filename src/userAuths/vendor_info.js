import React, { Component } from 'react';
import { Transfer, Tree } from 'antd';
import ApiCall from '../utils/apiCall';
import { message } from 'antd';
import image2base64  from 'image-to-base64';
const { TreeNode } = Tree;

const upload=(file)=>new Promise(resolve=>{

    var fReader = new FileReader();
  fReader.readAsDataURL(file);
  fReader.onloadend = function(event){
      var img = {};
      img.src = event.target.result;
      image2base64(img.src) // you can also to use url
      .then(response=>resolve(response))
      .catch(
          (error) => {
              console.log(error); //Exepection error....
          }
      )
  }
})

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode {...props} disabled={checkedKeys.includes(props.key)}>
            {generateTree(children, checkedKeys)}
        </TreeNode>
    ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    const transferDataSource = [];
    function flatten(list = []) {
        list.forEach(item => {
            transferDataSource.push(item);
            flatten(item.children);
        });
    }
    flatten(dataSource);

    return (
        <Transfer
            {...restProps}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            className="tree-transfer"
            render={item => item.title}
            showSelectAll={false}
        >
            {({ direction, onItemSelect, selectedKeys }) => {
                if (direction === 'left') {
                    const checkedKeys = [...selectedKeys, ...targetKeys];
                    return (
                        <Tree
                            blockNode
                            checkable
                            checkStrictly
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            onCheck={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                            }}
                            onSelect={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                            }}
                        >
                            {generateTree(dataSource, targetKeys)}
                        </Tree>
                    );
                }
            }}
        </Transfer>
    );
};



// const treeData = [
//  { key: '0-0', title: '0-0' },
//  {
//      key: '0-1',
//      title: '0-1',
//      children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }],
//  },
//  { key: '0-2', title: '0-3' },
// ];


export default class Vendor_info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetKeys: [],
            treeData: [],
            vendDetails:{},

        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.multipleSelectDays=this.multipleSelectDays.bind(this)
        this.multipleSelectLocation=this.multipleSelectLocation.bind(this)
    }
    componentWillMount() {
        document.title="Vendor Information | HORSETASK";
        ApiCall.get('/treedata').then(res => {

            if (res.data.status) {

                this.setState({ list: res.data.result })
                let treedata = []
                console.log(this.state.result)
                res.data.result.map(item => {
                    if (item.category) {
                        if (treedata.findIndex(x => x.key === item.category) === -1) {
                            console.log(item.name)
                            treedata.push(Object.assign({}, { key: item.category, title: item.category, children: [{ key: item.name, title: item.name }] }))
                        }
                        else {
                            treedata[treedata.findIndex(x => x.key === item.category)].children.push({ key: item.name, title: item.name });
                        }
                    }

                })

                this.setState({ treeData: treedata })
            }

            else {
                message.error(res.data.message, 1);
            }
        })

    }
    handleSubmit=(e)=>{
        // console.log(this.state.vendDetails)
        var userID=localStorage.getItem('userID');
        var token=localStorage.getItem('token')
        ApiCall.post('/vendorregister/'+userID,this.state.vendDetails,token).then(res=>{
            message.success('Registratin Successfull');
            window.location.href="/";
        })
    }

    onChange = targetKeys => {
        console.log('Target Keys:', targetKeys);
        this.state.vendDetails.targetKeys=targetKeys;
        this.setState({ targetKeys });


    };
    multipleSelectLocation=(e)=>{
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
           value.push(options[i].value);
          }
        }
        this.state.vendDetails.location=value
        //this.setState({vendDetails})
      }
    multipleSelectDays=(e)=>{
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
           value.push(options[i].value);
          }
        }
        this.state.vendDetails.days=value
        //this.setState({vendDetails})
      }
    render() {
        const { targetKeys,vendDetails } = this.state;
        return (
            <div id="wrapper">
                <header id="header-container" className="fullwidth transparent">
                    <div id="header">
                        <div className="container">
                            <div className="left-side">
                                <div id="logo">
                                    <a href="/">
                                        <img src="/myimg/logo.png" alt="" />
                                    </a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="clearfix"></div>
                <div className="dashboard-container">
                    <div className="dashboard-content-container" data-simplebar>
                        <div className="dashboard-content-inner">
                            <div className="dashboard-headline">

                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="dashboard-box margin-top-0">
                                        <div className="headline">
                                            <h3><i className="icon-feather-folder-plus"></i> Enter Company Details</h3>
                                        </div>
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">
                                                <div className="col-xl-12" >
                                                    <div className="col-auto" >
                                                        <div className="avatar-wrapper" data-tippy-placement="bottom" title="Upload Company Logo" style={{ margin: '0 auto 30px' }}>
                                                            <img className="profile-pic" src="images/user-avatar-placeholder.png" alt="" />
                                                            <div className="upload-button"></div>
                                                            <input className="file-upload" type="file" accept="image/*" onChange={(e)=>{vendDetails.vendor_image={file:'',name:e.target.files[0].name,type:e.target.files[0].type};upload(e.target.files[0]).then(str=>{vendDetails.vendor_image.file=str;this.setState({vendDetails})})}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Company's Name</h5>
                                                        <input onChange={(e)=>{vendDetails.companyname=e.target.value;this.setState({vendDetails})}} type="text" className="with-border" placeholder=" " />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Owner's Name </h5>
                                                        <input type="text" className="with-border" placeholder=" " onChange={(e)=>{vendDetails.ownername=e.target.value;this.setState({vendDetails})}} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Company Registration Number</h5>
                                                        <input type="text" className="with-border" placeholder=" " onChange={(e)=>{vendDetails.companyregnumber=e.target.value;this.setState({vendDetails})}} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Company's Tagline</h5>
                                                        <input type="text" className="with-border" placeholder=" " onChange={(e)=>{vendDetails.companytagline=e.target.value;this.setState({vendDetails})}}/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Phone Number</h5>
                                                        <input type="text" className="with-border" placeholder=" " onChange={(e)=>{vendDetails.mobile_no=e.target.value;this.setState({vendDetails})}}/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Email Id</h5>
                                                        <input type="text" className="with-border" placeholder=" " onChange={(e)=>{vendDetails.companyemail=e.target.value;this.setState({vendDetails})}}/>
                                                    </div>
                                                </div>

                                                <div className="col-xl-4 col-sm-6">
                                                    <div className="submit-field">
                                                        <h5>Company Address</h5>
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="input-with-icon">
                                                                    <input id="perhour" className="with-border" type="text" placeholder="e.g. 72" onChange={(e)=>{vendDetails.companyaddress=e.target.value;this.setState({vendDetails})}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-sm-6">
                                                    <div className="submit-field">
                                                        <h5>City</h5>
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="input-with-icon">
                                                                    <input id="perhour" className="with-border" type="text" placeholder="e.g. 8" onChange={(e)=>{vendDetails.city=e.target.value;this.setState({vendDetails})}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-sm-6">
                                                    <div className="submit-field">
                                                        <h5>State</h5>
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="input-with-icon">
                                                                    <input id="perhour" className="with-border" type="text" placeholder="e.g. 4" onChange={(e)=>{vendDetails.state=e.target.value;this.setState({vendDetails})}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-sm-6">
                                                    <div className="submit-field">
                                                        <h5>ZIP</h5>
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="input-with-icon">
                                                                    <input id="perhour" className="with-border" type="text" placeholder="e.g. 4" onChange={(e)=>{vendDetails.zip=e.target.value;this.setState({vendDetails})}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Location</h5>
                                                        <select className="selectpicker with-border" data-size="7" multiple title="Places You Provide This Service" onChange={this.multipleSelectLocation}>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia, Plurinational State of</option>
                                                            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                            <option value="BA">Bosnia and Herzegovina</option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">British Indian Ocean Territory</option>
                                                            <option value="BN">Brunei Darussalam</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Republic</option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CC">Cocos (Keeling) Islands</option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo</option>
                                                            <option value="CD">Congo, the Democratic Republic of the</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="CI">Côte d'Ivoire</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CW">Curaçao</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GU">Guam</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GG">Guernsey</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-Bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="HT">Haiti</option>
                                                            <option value="HM">Heard Island and McDonald Islands</option>
                                                            <option value="VA">Holy See (Vatican City State)</option>
                                                            <option value="HN">Honduras</option>
                                                            <option value="HK">Hong Kong</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IN">India</option>
                                                            <option value="ID">Indonesia</option>
                                                            <option value="MP">Northern Mariana Islands</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="OM">Oman</option>
                                                            <option value="PK">Pakistan</option>
                                                            <option value="PW">Palau</option>
                                                            <option value="PS">Palestinian Territory, Occupied</option>
                                                            <option value="PA">Panama</option>
                                                            <option value="PG">Papua New Guinea</option>
                                                            <option value="PY">Paraguay</option>
                                                            <option value="PE">Peru</option>
                                                            <option value="PH">Philippines</option>
                                                            <option value="PN">Pitcairn</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="PR">Puerto Rico</option>
                                                            <option value="QA">Qatar</option>
                                                            <option value="RE">Réunion</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="RU">Russian Federation</option>
                                                            <option value="RW">Rwanda</option>
                                                            <option value="SJ">Svalbard and Jan Mayen</option>
                                                            <option value="SZ">Swaziland</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="SY">Syrian Arab Republic</option>
                                                            <option value="TR">Turkey</option>
                                                            <option value="TM">Turkmenistan</option>
                                                            <option value="TC">Turks and Caicos Islands</option>
                                                            <option value="TV">Tuvalu</option>
                                                            <option value="UG">Uganda</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="AE">United Arab Emirates</option>
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="US">United States</option>
                                                            <option value="UY">Uruguay</option>
                                                            <option value="UZ">Uzbekistan</option>
                                                            <option value="YE">Yemen</option>
                                                            <option value="ZM">Zambia</option>
                                                            <option value="ZW">Zimbabwe</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4" style={{ display: 'inline-block !important' }}>
                                                    <div className="submit-field">
                                                        <h5>Days you offer service</h5>
                                                        <select className="selectpicker with-border" data-size="7" multiple title="Select Days" onChange={this.multipleSelectDays}>
                                                            <option value="AR">Sunday</option>
                                                            <option value="AM">Monday</option>
                                                            <option value="AW">Tuesday</option>
                                                            <option value="AU">Wednesday</option>
                                                            <option value="AT">Thursday</option>
                                                            <option value="AZ">Friday</option>
                                                            <option value="BS">Saturday</option>


                                                        </select>
                                                    </div>
                                                </div>
                                                {/* <div className="col-xl-12" style={{marginBottom:'40px'}}>
                                            <div className="submit-field">
                                            <h5>Services you provide</h5>
                                        <select id="test-select-4" multiple="multiple">
                                     <option value="baz1" data-section="Appliance Repair" data-index="1">baz1</option>
                                     <option value="baz2" data-section="Appliance Repair" data-index="1">baz2</option>
                                     <option value="baz3" data-section="Appliance Repair" data-index="1">baz3</option>
                                     <option value="baz4" data-section="Appliance Repair" data-index="1">baz4</option>
                                     <option value="quux1" data-section="Beauty & Spa" data-index="1">quux1</option>
                                     <option value="quux2" data-section="Beauty & Spa" data-index="1">quux2</option>
                                     <option value="quux3" data-section="Beauty & Spa" data-index="1">quux3</option>
                                     <option value="quux4" data-section="Beauty & Spa" data-index="1">quux4</option>
                                     </select>   
                                        </div></div> */}
                                                <div className="col-xl-12"> <TreeTransfer dataSource={this.state.treeData} targetKeys={targetKeys} onChange={this.onChange} /></div>
                                                <br />
                                                <br />
                                                <div className="col-xl-12"> <a href="JavaScript:Void(0);" className="button ripple-effect big margin-top-30 margin-bottom-30" style={{ width: '260px', textAlign: 'center', margin: 'auto', display: 'block' }} onClick={this.handleSubmit}> Add Vendor</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-footer-spacer"></div>
                            <div className="small-footer margin-top-15">
                                <div className="small-footer-copyrights">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
                                <ul className="footer-social-links">
                                    <li>
                                        <a href="#" title="Facebook" data-tippy-placement="top">    <i className="icon-brand-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Twitter" data-tippy-placement="top"> <i className="icon-brand-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Google Plus" data-tippy-placement="top"> <i className="icon-brand-google-plus-g"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="LinkedIn" data-tippy-placement="top">    <i className="icon-brand-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}