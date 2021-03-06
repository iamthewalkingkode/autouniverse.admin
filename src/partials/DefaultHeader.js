import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import Logo from '../assets/img/logo.svg';
// import sygnet from '../../assets/img/brand/sygnet.svg';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { _auth: { logg } } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: Logo, width: 'auto', height: 65, alt: 'AutoUniverse Logo' }}
        // minimized={{ src: sygnet, width: 30, height: 30, alt: 'AutoUniverse Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav style={{ marginRight: 20 }}>
              <img src={'https://coreui.io/react/demo/assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              {logg.name}
            </DropdownToggle>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
