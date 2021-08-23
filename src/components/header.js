import React, {Component, useState, useEffect} from 'react';
import jQuery from "jquery";
import axios from "axios";
import {Col, Container, Image, Row, Nav, Navbar} from "react-bootstrap";
import {Switch,Route, Link, NavLink} from 'react-router-dom';
import {Loading} from "./loading";

export default function Header() {
    const [expanded, setExpanded] = useState(false);
    const [ data , setData ] = useState([ ]);
    const [ fetching, setFetching ] = useState(true);
    const [ home, setHome] = useState(true);
    useEffect( () => {
        axios.get('http://chakito.com/blog/index.php/wp-json/menus/v1/menus/menu').then(res => {
            setData(res.data);
            setFetching(false);

        });
    }, []);
    useEffect( () => {
        jQuery('.navbar-toggler').on('click', function () {
            jQuery('body').toggleClass('overflowhidden');
            jQuery('.navigation-link').on('click', function () {
                jQuery('body').removeClass('overflowhidden');
            });
        });
        if ( window.location.pathname === '/' ){
            jQuery('.logo').css('pointer-events', 'none');
            setHome(true);
        }
        else {
            jQuery('.logo').css('pointer-events', 'auto');
            setHome(false);

        }
        jQuery('.logo').on("click", function (){
            jQuery('.navigation-link').css('transition', 'all ease-in-out .3s 1.2s');
            jQuery('.logo').css('transition', 'all ease-in-out .3s 1.2s');

            setTimeout(function () {
                jQuery('.navigation-link').css('transition', 'all ease-in-out .3s');
                jQuery('.logo').css('transition', 'all ease-in-out .3s');
            }, 600);
        })
        jQuery(window).scroll(function () {
            if (jQuery(window).scrollTop() > 50) {
                jQuery('.header').addClass('scrolled');
            }
            else {
                jQuery('.header').removeClass('scrolled');

            }
        });
    });
    return (
        <Container fluid  className="header w-100 h-100">
            <Row className=" justify-content-between h-100 m-0">
                <Col xs={3} lg={3}>
                    <Link className='logo' onClick={() => setExpanded(false)} to='/'>
                        <svg id="Ebene_1" className="logo" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.96 105.55">
                            <path className="cls-1"
                                  d="M25.94,67.09,83.66,37.8V53.89L42.23,74.07,83.66,94.84V111L25.94,81.31Z"
                                  transform="translate(-25.94 -5.47)"/>
                            <path className="cls-1" d="M92.9,49.4,35.18,78.69V62.6L76.61,42.42,35.18,21.65V5.47L92.9,35.18Z"
                                  transform="translate(-25.94 -5.47)"/>
                        </svg>
                    </Link>


                </Col>
                <Col xs={6} lg={6}>
                    <Navbar className="justify-content-end" expanded={expanded} expand="xxl" sticky="bottom">
                        {fetching
                            ? <Loading text='Laden'/>
                            :
                            <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
                                <Nav className="w-100 justify-content-center">

                                    {data.items
                                        ?data.items.map((item, i) => (
                                            <Nav.Item className="px-lg-3" key={i}>
                                                <NavLink className='navigation-link' data-name={item.title}
                                                         onClick={() => setExpanded(false)} exact activeClassName="active" to={{
                                                    pathname: `/${item.slug}`
                                                }}
                                                >{item.title}</NavLink>
                                            </Nav.Item>
                                        ))
                                        : ''}

                                </Nav>
                            </Navbar.Collapse> }
                        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" >
                            <span className="line"/>
                            <span className="line"/>
                            <span className="line"/>
                        </Navbar.Toggle>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}
