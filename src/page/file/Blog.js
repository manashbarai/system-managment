import React from 'react'
import './Blog.css'


import Insidesale from './Images/Inside-sales-guide-705x353.jpg'
import Leadduplication from './Images/lead-duplication-banner.png'
import B2B from './Images/b2b-lead-generation-challenge-cover.jpg'
import Customerexp from './Images/Customer-Engagement-Metrics-to-Improve-your-Marketing-Strategy-in-2023-.webp'
import Higheredu from './Images/Higher-Education-CRM-Benefits-Admissions-Teams-.png'
import Marketing from './Images/CRM-marketing-guide-705x353.png'
import LeadManagement from './Images/Best-Lead-Management-Software-in-Bangalore.jpg'
import Best from './Images/Best-CRM-for-Startups.jpg'
import Customereng from './Images/Customer-engagement-strategies.jpg'
import CustomerRetention from './Images/CRM-customer-retention-strategies-brand-examples-705x353.jpg'
import Bestexp from './Images/What-is-CX-customer-experience.webp'
import Cxjourney from './Images/How-To-Create-A-Customer-Journey-Analytics-Dashboard.png'
import Salesstatistics from './Images/Sales-Statistics-for-2023.webp'
import Footer from './Footer'

const Blog = () => {
    return (
        <>
           

            {/* ----------------------------------First Section------------------------------------------ */}

            <div className='sblog_Firstbackground'>
                <div className='container'>
                    <div className='sblog_FirstOne'>
                        <h1 className='sblog_firstHeading'>Blog</h1>
                        <p className='mt-3 sblog_firstPara'>Get the best resources on sales and sales strategies – including the latest trends, learnings from industry experts,<br/> and the tools that are transforming selling, across the globe</p>
                    </div>
                </div>
            </div>
            {/* ----------------------------------First Section Ends here------------------------------------------ */}

            {/* -----------------------------------------------Second Section----------------------------------------------------- */}

            <div className='sblog_Secondbackground'>
                <div className='container'>
                    <div className='sblog_Heading'>
                        <h1 className='sblog_Feature'>Featured Posts</h1>
                        <h3 className='sblog_Discover'>Discover Our Top Picks</h3>
                    </div>
                    <div className='mt-5 row'>
                        <div className='col-md-4'>
                            <div className='sblog_Image'>
                                <img src={Insidesale} alt="sale" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>Inside Sales: A Complete Guide<br /> With Process, Tools & Best...</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image1'>
                                <img src={Leadduplication} alt="duplicate" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>The 5 Dangers of Lead Duplication and How to Avoid...</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image'>
                                <img src={B2B} alt="business" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>Conquering B2B Lead Generation Challenge</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 row'>
                        <div className='col-md-4'>
                            <div className='sblog_Image'>
                                <img src={Customerexp} alt="custexp" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>13 Customer Engagement Metrics <br />to Improve your Marketing Strategy</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image1'>
                                <img src={Higheredu} alt="education" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>12 Ways a Higher Education CRM Benefits Admissions Teams </h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image'>
                                <img src={Marketing} alt="marketing" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>CRM Marketing: The Secret Recipe for Higher Engagement</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 row'>
                        <div className='col-md-4'>
                            <div className='sblog_Image2'>
                                <img src={LeadManagement} alt="custmanagementexp" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>No.1 Best Lead Management<br />-CRM </h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image2'>
                                <img src={Best} alt="best crm" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>Best CRM for Startups. Top 7 <br />things to Look for in a CRM</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image2'>
                                <img src={Customereng} alt="custengagement" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>How to Increase Customer Engagement?</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 row'>
                        <div className='col-md-4'>
                            <div className='sblog_Image2'>
                                <img src={Bestexp} alt="Best experience" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>What Is CX? How to Deliver<br /> the Best Customer Experiences</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image2'>
                                <img src={Cxjourney} alt="best cxjourney" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>How To Create A Customer <br/>Journey Analytics Dashboard !</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sblog_Image2'>
                                <img src={Salesstatistics} alt="custengagement" />
                            </div>
                            <div className='mt-3 sblog_date'>
                                <h5 className='sblog_Name'>Tapan Sur</h5>
                                <h5 className='sblog_Name'>/</h5>
                                <h5 className='sblog_dATe'>14 Jan 2024</h5>
                            </div>
                            <div className='mt-3 sblog_Context1'>
                                <h1 className='sblog_conTent1'>30 Must-Know Sales Statistics for 2024 [Expert Insights Included!]</h1>
                                <button className='mt-3 btn sblog_Readmore'>Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------------------------------Second Section Ends Here------------------------------------------ */}

            <Footer />

        </>
    )
}

export default Blog