import React, { useState } from "react";
import { connect } from "react-redux";
import "./bootstrap.css";
import "./main.css";
import "./fontawesome.min.css";
import { useFormik } from "formik";
import copy from "copy-to-clipboard";

const Welcome = (props) => {
  const [screen, setScreen] = useState(false);
  const [link, setLink] = useState("");

  function validate(values) {
    const errors = {};
    if (!values.address) {
      errors.name = "Required";
    }
    return errors;
  }

  function submitForm(values, { resetForm }) {
    let data = {
      address: values.address
    };

    let base_url = window.location.origin
      ? window.location.origin + '/'
      : window.location.protocol + '/' + window.location.host + '/';

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
      //let url = `http://localhost:8000/${res.msg}`;
      let url = base_url + res.msg
      resetForm({ values: "" })
      setLink(url);
      setScreen(true)
    })
  }

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validate,
    onSubmit: submitForm,
  });

  function handleCancel() {
    copy(link)
    setScreen(false)
  }

  let nameClassList = [
    "form-control",
    "main-input",
    formik.errors.address && formik.touched.address ? "redbd" : null,
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="text-section">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-sm-12">
                <div className="promo">
                  <h1>STORD URL Shortener</h1>
                  <p className="description">This is a demo to convert domain url to shortened url.</p>
                </div>
                {screen ?
                  <div className="ajax">
                    <div className="alert alert-success no-round">URL has been successfully shortened</div>
                    <form autoComplete='off' id="main-form">
                      <div className="main-form">
                        <div className="row">
                          <div className="col-sm-10">
                            <div className="input-group">
                              <div className="success"><a href={link} target="_blank" id="url">{link}</a></div>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <button
                              type="submit"
                              onClick={handleCancel}
                              className="btn btn-primary btn-block main-button"
                            >copy</button>
                          </div>
                        </div>
                      </div>
                      <div className="main-options clearfix"></div>
                    </form>
                  </div>
                  :

                  <form onSubmit={formik.handleSubmit} autoComplete='off' id="main-form">
                    <div className="main-form">
                      <div className="row">
                        <div className="col-sm-8 col-lg-10">
                          <div className="input-group">
                            <input
                              className={nameClassList.join(" ")}
                              name="address"
                              type="text"
                              placeholder="Paste a long url"
                              autoFocus
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block main-button"
                            disabled={formik.isSubmitting}
                          >shorten</button>
                        </div>
                      </div>
                    </div>
                    <div className="main-options clearfix"></div>
                  </form>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    store: state.store,
  };
};
export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(Welcome);
