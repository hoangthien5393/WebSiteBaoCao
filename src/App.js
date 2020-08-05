import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import DateTimePicker from 'react-datetime-picker';
import { CircleLoading } from 'react-loadingg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

var API = require("./APIcontroler");
var numeral = require('numeral');


//

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: false,
      dateF: new Date(),
      dateT: new Date(),
      DauKy: { OTT: 0, OTL: 0, XMT: 0, XML: 0, TONG: 0 },
      GiuaKy: { OTT: 0, OTL: 0, XMT: 0, XML: 0, TONG: 0 },
      CuoiKy: { OTT: 0, OTL: 0, XMT: 0, XML: 0, TONG: 0 },
      TrongBai: {OT: 0, XM: 0, XD: 0, TONG: 0},
      XeVao: {OT: 0, XM: 0, XD: 0, TONG: 0},
      XeRa: {OT: 0, XM: 0, XD: 0, TONG: 0},
      XeMV: {OT: 0, XM: 0, XD: 0, TONG: 0},
    };

    this.setState({dateF: this.state.dateF.setHours(0, 0, 0)})
  }

  componentDidMount()
  {
   this.login();
  }

  login = (e) => {
    if(e != undefined)
    e.preventDefault();
    this.setState({ isloading: true });
    API.getData({ DateF: this.state.dateF, DateT: this.state.dateT }, (data) => {
      if (data == "error") {
        alert("Mất kết nối đến server")
        this.setState({ isloading: false });
      }
      else {
        this.setState({ isloading: false });
        this.setState(state => {
          const list = this.state.DauKy;
          list.OTT = data.OTTDK;
          list.TONG = data.TONGDK;
          list.XML = data.XMLDK;
          list.XMT = data.XMTDK;
          list.OTL = data.OTLDK;
          return {
            list,
            value: '',
          };
        });

        this.setState(state => {
          const list = this.state.GiuaKy;
          list.OTT = data.OTTTK;
          list.TONG = data.TONGTK;
          list.XML = data.XMLTK;
          list.XMT = data.XMTTK;
          list.OTL = data.OTLTK;
          return {
            list,
            value: '',
          };
        });
        this.setState(state => {
          const list = this.state.CuoiKy;
          list.OTT = data.OTTCK;
          list.TONG = data.TONGCK;
          list.XML = data.XMLCK;
          list.XMT = data.XMTCK;
          list.OTL = data.OTLCK;
          return {
            list,
            value: '',
          };
        });
        //sl xe
        this.setState(state => {
          const list = this.state.TrongBai;
          list.OT = data.OTXTB;
          list.TONG = data.TONGXTB;
          list.XM = data.XMXTB;
          list.XD = data.XDXTB;
          return {
            list,
            value: '',
          };
        });
        //
        this.setState(state => {
          const list = this.state.XeVao;
          list.OT = data.OTXDV;
          list.TONG = data.TONGXDV;
          list.XM = data.XMXDV;
          list.XD = data.XDXDV;
          return {
            list,
            value: '',
          };
        });
        //
        this.setState(state => {
          const list = this.state.XeRa;
          list.OT = data.OTXDR;
          list.TONG = data.TONGXDR;
          list.XM = data.XMXDR;
          list.XD = data.XDXDR;
          return {
            list,
            value: '',
          };
        });
        //
        this.setState(state => {
          const list = this.state.XeMV;
          list.OT = data.OTXMV;
          list.TONG = data.TONGXMV;
          list.XM = data.XMXMV;
          list.XD = data.XDXMV;
          return {
            list,
            value: '',
          };
        });
      }
    })

  }
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  render() {
    if (this.state.isloading) {
      return (
        <CircleLoading color="#fff" />
      )
    }
    
    return (
      <form className="auth-innerMain">
        <h3>Báo Cáo Tổng Hợp</h3>
        <Tabs>
          <TabList>
            <Tab>Doanh Thu</Tab>
            <Tab>Lượt Xe</Tab>
          </TabList>

          <TabPanel>
            <MDBTable bordered>
              <MDBTableHead>
                <tr>
                  <th>Loại Vé</th>
                  <th>Số Đầu Kỳ (VNĐ)</th>
                  <th>Phát Sinh Trong Kỳ (VNĐ)</th>
                  <th>Số Cuối Kỳ (VNĐ)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <th>Ô tô tháng</th>
                  <td>{numeral(this.state.DauKy.OTT).format('0,0')}</td>
                  <td>{numeral(this.state.GiuaKy.OTT).format('0,0')}</td>
                  <td>{numeral(this.state.CuoiKy.OTT).format('0,0')}</td>
                </tr>
                <tr>
                  <th>Ô tô lượt</th>
                  <td>{numeral(this.state.DauKy.OTL).format('0,0')}</td>
                  <td>{numeral(this.state.GiuaKy.OTL).format('0,0')}</td>
                  <td>{numeral(this.state.CuoiKy.OTL).format('0,0')}</td>
                </tr>
                <tr>
                  <th>Xe máy tháng</th>
                  <td>{numeral(this.state.DauKy.XMT).format('0,0')}</td>
                  <td>{numeral(this.state.GiuaKy.XMT).format('0,0')}</td>
                  <td>{numeral(this.state.CuoiKy.XMT).format('0,0')}</td>
                </tr>

                <tr>
                  <th>Xe máy lượt</th>
                  <td>{numeral(this.state.DauKy.XML).format('0,0')}</td>
                  <td>{numeral(this.state.GiuaKy.XML).format('0,0')}</td>
                  <td>{numeral(this.state.CuoiKy.XML).format('0,0')}</td>
                </tr>

                <tr>
                  <th style={{ color: 'red' }}>TỔNG</th>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.DauKy.TONG).format('0,0')}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.GiuaKy.TONG).format('0,0')}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.CuoiKy.TONG).format('0,0')}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </TabPanel>
          <TabPanel>
            <MDBTable bordered>
              <MDBTableHead>
                <tr>
                  <th>Loại Vé</th>
                  <th>Xe Trong Bãi (Xe)</th>
                  <th>Xe Đã Vào (Xe)</th>
                  <th>Xe Đã Ra (Xe)</th>
                  <th>Xe Mất Vé (Xe)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <th>Ô tô</th>
                  <td>{numeral(this.state.TrongBai.OT).format('0,0')}</td>
                  <td>{numeral(this.state.XeVao.OT).format('0,0')}</td>
                  <td>{numeral(this.state.XeRa.OT).format('0,0')}</td>
                  <td>{numeral(this.state.XeMV.OT).format('0,0')}</td>
                </tr>
                <tr>
                  <th>Xe Máy</th>
                  <td>{numeral(this.state.TrongBai.XM).format('0,0')}</td>
                  <td>{numeral(this.state.XeVao.XM).format('0,0')}</td>
                  <td>{numeral(this.state.XeRa.XM).format('0,0')}</td>
                  <td>{numeral(this.state.XeMV.XM).format('0,0')}</td>
                </tr>
                <tr>
                  <th>Xe Đạp</th>
                  <td>{numeral(this.state.TrongBai.XD).format('0,0')}</td>
                  <td>{numeral(this.state.XeVao.XD).format('0,0')}</td>
                  <td>{numeral(this.state.XeRa.XD).format('0,0')}</td>
                  <td>{numeral(this.state.XeMV.XD).format('0,0')}</td>
                </tr>

                {/* <tr>
                  <th>Xe máy lượt</th>
                  <td>{numeral(this.state.DauKy.XML).format('0,0')}</td>
                  <td>{numeral(this.state.GiuaKy.XML).format('0,0')}</td>
                  <td>{numeral(this.state.CuoiKy.XML).format('0,0')}</td>
                  <td>{numeral(this.state.CuoiKy.OTT).format('0,0')}</td>
                </tr> */}

                <tr>
                  <th style={{ color: 'red' }}>TỔNG</th>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.TrongBai.TONG).format('0,0')}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.XeVao.TONG).format('0,0')}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.XeRa.TONG).format('0,0')}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>{numeral(this.state.XeMV.TONG).format('0,0')}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </TabPanel>
        </Tabs>



        <div>
          <label style={{ color: 'red', marginRight: 21 }}>Thời gian từ: </label>
          <DateTimePicker

            onChange={(date) => { this.setState({ dateF: date }) }}
            value={this.state.dateF}
            format="dd/MM/yyyy HH:mm"

          />

        </div>
        <div style={{ marginBottom: 5 }}>
          <label style={{ color: 'red', marginRight: 10 }}>Thời gian đến: </label>
          <DateTimePicker

            onChange={(date) => { this.setState({ dateT: date }) }}
            value={this.state.dateT}
            format="dd/MM/yyyy HH:mm"
          />

        </div>
        <button onClick={(e) => { this.login(e) }} type="submit" className="btn btn-primary btn-block">Tìm Kiếm</button>
        <div style={{ textAlign: "center", width: "100%", marginTop: 10 }}><Link onClick={() => fakeAuth.signout()}>Thoát</Link></div>
      </form>
    );
  }
}
//
//
//
class Login extends Component {

  state = { thongbao: "", redirectToReferrer: false, username: "", password: "", isloading: false }


  login = (e) => {
    e.preventDefault();
    this.setState({ isloading: true });
    API.getUser({ data: this.state.username, password: this.state.password, Mode: "UserName" }, (data) => {
      if (data == true) {
        this.setState({ isloading: false });
        fakeAuth.authenticate(() => {
          this.setState(() => ({
            redirectToReferrer: true
          }))
        });
        this.props.history.push('/sign-up')
      }
      else if (data == "error") {
        this.setState({ isloading: false });
        this.setState({ thongbao: "Mất kết nối đến Sever" });

      }
      else {
        this.setState({ isloading: false });
        this.setState({ thongbao: data });
      }
    })

  }

  render() {
    if (this.state.isloading) {
      return (
        <CircleLoading color="#fff" />
      )
    }
    return (
      <form className="auth-inner">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" hidden={false}>
          <h5 style={{
            textAlign: "center", width: "100%", height: "100%",
            marginTop: 10, color: "olive"
          }} hidden={false}>HITPARKING WEB V6.1.0</h5>
        </nav>
        <h3>Đăng Nhập</h3>

        <div className="form-group">
          <label>Tài Khoản</label>
          <input type="user" className="form-control" placeholder="Tên Tài Khoản" value={this.state.username} onChange={(data) => { this.setState({ username: data.target.value }) }} />
        </div>

        <div className="form-group">
          <label>Mật Khẩu</label>
          <input type="password" className="form-control" placeholder="Mật Khẩu" onChange={(data) => { this.setState({ password: data.target.value }) }} />
        </div>

        <div className="" style={{ textAlign: "center", }}>
          <label style={{ color: 'red' }}>{this.state.thongbao}</label>
        </div>
        <button onClick={(e) => { this.login(e) }} type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>
      </form>
    );
  }
}
//

function App() {
  return (<Router>
    <div className="App" style={{ marginTop: 20 }}>
      <div className="auth-wrapper" >
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/sign-in" component={Login} />
          <PrivateRoute path="/sign-up" component={SignUp} />
        </Switch>
      </div>
    </div></Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }} />
  )} />
)


export default App;