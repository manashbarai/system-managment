import React from 'react'
import './faq.css'
import Navbar from './Navbar'
import Footer from './Footer'

const FAQs = () => {
  return (
    <>

      <Navbar />
      {/* ----------------------------------First Section------------------------------------------ */}

      <div className='sfaq_Firstbackground'>
        <div className='container'>

          <div className='sfaq_Heading'>
            <h1 className='sfaq_heaDing'>FAQs</h1>
            <h3 className='sfaq_Find'>Find answers to the most common questions about Finreify CRM</h3>
          </div>
        </div>
      </div>
      {/* ----------------------------------First Section Ends here------------------------------------------ */}

      {/* -----------------------------Second Part-------------------------------------------------     */}

      <div className="container acordionPart sfaq_Accordian">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                How much does Finreify CRM cost?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                  You can find the prices for all our plans on the Finreify CRM <a style={{ textDecoration: 'none' }} href='/' className='sfaq_Pricing'>Pricing page</a>.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                What is Finreify CRM?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                  Finreify CRM is the true customer-centric tool for your sales needs.
                  Track leads, get accurate forecasts, and focus on what matters: converting opportunities to Business.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Can I access my Finreify CRM account again after I've closed it?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                Yes, users with prior billing access can regain access to a closed CRM account. To do this, log in to Finreify CRM with the details linked to the closed account and provide new billing information. Remember, this is only possible if your data still exists on Finreify’s CRM servers.If you don’t have billing access and want to reactivate your account, please contact an account admin or another user with prior billing access.If you need help regaining access to the account, you can <a style={{ textDecoration: 'none' }} href='/' className='sfaq_Contact'>Contact Support</a>, who will assist you.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
               Why can't I create a Finreify’s CRM account?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                If you’re struggling to create a Finreify CRM account, check your details in the sign-up form and look for any error messages. If you still can’t make a new Finreify CRM account, please <a style={{ textDecoration: 'none' }} href='/' className='sfaq_Getintouch'>get in touch with support</a> for help.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                How do I change or reset my Finreify's CRM password?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                If you can access your Finreify CRM account, you can change your password in your settings. If you’re trying to log in but don’t remember your login password, click the "<span style={{color:'#000', fontWeight:'bold'}}>Forgot Password?</span>".
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Can I use it in my MAC / Windows system?
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                You are free to use our CRM on any device of your choice. Since our application is web-based, any device which has got web browser will support our application which includes your Windows, Mac desktops & Laptops, Tablets & Mobile Devices.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
               Do I need to Download & Install any software to use CRM?
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                Finreify's CRM is a Web based Application and there is no need to download and install any kind of software. You can just signup and start using the CRM in less than 2 minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
              >
               Why should I buy Finreify's CRM?
              </button>
            </h2>
            <div
              id="collapseEight"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                With regards to the features, security, pricing and performance of our system, we stand out in the market and in order to grow your business, Finreify CRM will help as a major tool by providing the service at a much better price.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseNine"
                aria-expanded="false"
                aria-controls="collapseNine"
              >
                How to use it?
              </button>
            </h2>
            <div
              id="collapseNine"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                You can simply register with us and by seeing the admin panel itself you will understand how to use it.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fa_first1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTen"
                aria-expanded="false"
                aria-controls="collapseTen"
              >
                What does support includes?
              </button>
            </h2>
            <div
              id="collapseTen"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className='fa_Para1'>
                Support includes both technical and generic questions/ doubts that you are in need to use the CRM in an effective way. It is also related to any features in our system that you couldn’t be able to understand or use and our team will help you in understanding it better.
                </p>
              </div>
            </div>
          </div>
          

        </div>
      </div>
      <div className='container'>
        <div className='mt-5 fa_View'>
          <button className='btn fa_viewMore'>View More</button>
        </div>
      </div>

      <div className='mt-5'>
        <Footer/>
      </div>


    </>
  )
}

export default FAQs