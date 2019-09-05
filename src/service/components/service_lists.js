import React, { Component } from "react";
import Header from "../../common/header";
import alphabets from "../../alphabets.json";
import Footer from "../../common/footer";

export default class Service_lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKeyWord: "A",
      alphabets: alphabets,
      keywords: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  }

  render() {
    console.log(this.state.alphabets["B"]);
    return (
      <div id="wrapper">
        <Header />
        <div id="titlebar" className="gradient">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Browse All Services</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="letters-list">
                {this.state.keywords.map((item, indx) => {
                  return (
                    <a
                      href="#"
                      key={indx}
                      onClick={() => this.setState({ activeKeyWord: item })}
                      className={
                        this.state.activeKeyWord === item
                          ? "let current"
                          : "let"
                      }
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="col-xl-12">
              <ul className="letter" id="letter">
                {this.state.alphabets[this.state.activeKeyWord.trim()] !==
                undefined
                  ? this.state.alphabets[this.state.activeKeyWord.trim()].map(
                      (item, indx) => {
                        return (
                          <li key={indx} className="lettera">
                            {item}
                          </li>
                        );
                      }
                    )
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>
          {`
            ul.letter li {
              text-align: left;
              list-style: none;
              display: inline-block;
              width: 24%;
              padding: 10px 5px;
              vertical-align: top;
              font-size: 13px;
            }
            ul.letter {
              margin-top: 40px;
            }
            #navigation {
              right: 210px !important;
            }

            $(' .message-by-headline h5').on('click', function(){
		  	$('li.active-message').removeClass('active-message');
		    $(this).parents('li').addClass('active-message');
		    $('.message-content').addClass('display');
		    $('.messages-inbox').addClass('max-width');
		    $('button.red').addClass('displaynone');



	      	});
          `}
        </style>
      </div>
    );
  }
}
