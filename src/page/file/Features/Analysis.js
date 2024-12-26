import React from 'react'
import './Analysis.css'
import Navbar from '../Navbar'
import Footer from '../Footer'

import firstImg from './Images/csri-img.svg'
import circletick from './Images/circle-check-solid.svg'
import Tasks from './Images/include-icon.svg'
import Check from './Images/singlecheck-solid.svg'
import Report from './Images/cr-icon-1.svg'
import Customize from './Images/cr-icon-3.svg'
import Download from './Images/cr-icon-2.svg'
import Organized from './Images/cr-icon-4.svg'
import dashboardanalysis from './Images/dashboardAnalysis.png'
import CRMdashboard from './Images/crmdasBOArd.png'
import Linegraph from './Images/graph card.png'
import teamPerformance from './Images/bsr-icon-1.svg'
import Target from './Images/bsr-icon-2.svg'
import Graphs from './Images/bsr-icon-3.svg'
import Datadriven from './Images/bsr-icon-4.svg'
import Revenue from './Images/bsr-icon-5.svg'

const Analysis = () => {
    return (
        <>
           

            {/* ----------------------------------First Section------------------------------------------ */}

            <div className='sanalysis_Firstbackground'>
                <div className='container'>
                    <div className='row sanalysis_First'>
                        <div className='col-md-5 sanalysis_FirstOne'>
                            <h1 className='sanalysis_firstHeading'>Top Analytical <span className='sanalysis_Crm'>CRM</span> <br/>Applications</h1>
                            <p className='mt-3 sanalysis_firstPara'>CRM software plays an important role in <br />gathering key insights into customers, managing<br/> customer relationships, and delivering CRM <br/>analytics and data to build and nurture<br/> business growth.</p>
                            <div className='mt-5 sanalysis_Button'>
                                <button className='btn sanalysis_Book'>Book a Demo</button>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-5'>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------------------First Section Ends here------------------------------------------ */}

            {/* -------------------------------Second Section----------------------------------- */}

            <div className='sanalysis_Secondbackground'>
                <div className='container'>
                    <div className='sanalysis_Heading'>
                        <h1 className='sanalysis_Analytical'>What is Analytical CRM?</h1>
                        <p className='sanalysis_Para2'>Analytical CRM is one of the main types of CRM. It combines the capabilities of a CRM with analytics to study customer behavior. It examines and creates a systematic evaluation of customer data using business intelligence, looks at past sales trends, current leads and opportunities, and identifies patterns in a customer’s purchase behavior. </p>
                    </div>
                </div>
            </div>

            {/* -------------------------------Second Section Ends Here----------------------------------- */}

            {/* ---------------------------------Third Section------------------------------------- */}

            <div className='sanalysis_thirdBackground'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 sanalysis_FirstPart'>
                            <div className='sanalysis_Image1'>
                                <img src={firstImg} alt="analysis" />
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                        <div className='col-md-7 sanalysis_SecondPart'>
                            <div className='sanalysis_thirdGroup'>
                                <div className='sanalysis_Firstgroup'>
                                    <div className='sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Multi-Dimensional Report on Dashboard</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Track crucial sales metrics</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>One click access to Lead or Deal data</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Filter your reports using dates</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Meeting Reports on Dashboards</h3>
                                    </div>
                                </div>
                                <div className='sanalysis_Firstgroup'>
                                    <div className='sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Filters for easy access to reports</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Visualize data as graphs and charts</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Create Reports for various roles & teams</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Company reports on Dashboards</h3>
                                    </div>
                                    <div className='mt-3 sanalysis_Text1'>
                                        <img src={circletick} alt="analysis" />
                                        <h3 className='sanalysis_Multi'>Export and share reports easily with your teams</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------------------Third Section ends here----------------------------- */}

            {/* ------------------------Fourth Section-------------------------------- */}

            <div className='sanalysis_Fourtbackground'>
                <div className='container'>
                    <div className='sanalysis_fouthGroup'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <div className='sanalysis_Image4'>
                                    <img src={Tasks} alt="task" />
                                </div>
                            </div>
                            <div className='col-md-10'>
                                <div className='sanalysis_headinG'>
                                    <h1 className='sanalysis_Includes'>Includes</h1>
                                </div>
                                <div className='mt-2 sanalysis_Part1'>
                                    <div className='sanalysis_Textgroup'>
                                        <div className='sanalysis_Image45'>
                                            <img src={Check} alt="correcticon" />
                                        </div>
                                        <h4 className='sanalysis_Dash'>Dashboard</h4>
                                    </div>
                                    <div className='sanalysis_Textgroup'>
                                        <div className='sanalysis_Image45'>
                                            <img src={Check} alt="correcticon"/>
                                        </div>
                                        <h4 className='sanalysis_Dash'>Revenue Forecast</h4>
                                    </div>
                                </div>
                                <div className='mt-1 sanalysis_Part1'>
                                    <div className='sanalysis_Textgroup1'>
                                        <div className='sanalysis_Image45'>
                                            <img src={Check} alt="correcticon" />
                                        </div>
                                        <h4 className='sanalysis_Dash'>Leads Reporting</h4>
                                    </div>
                                    <div className='sanalysis_Textgroup'>
                                        <div className='sanalysis_Image45'>
                                            <img src={Check} alt="correcticon" />
                                        </div>
                                        <h4 className='sanalysis_Dash'>Team Management</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* -------------------------------Fourth Section ends here------------------------- */}

            {/* ------------------------------Fifth section------------------------------------------ */}

            <div className='sanalysis_fifthBackground'>
                <div className='container'>
                    <div className='sanalysis_fifthbackground'>
                        <h1 className='sanalysis_Custom'>Custom Reports</h1>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mt-5 sanalysis_FifthGroup'>
                                <div className='sanalysis_fifthImg'>
                                    <img src={Report} alt="datareport" />
                                </div>
                                <div className='sanalysis_Build'>
                                    <h4 className='sanalysis_rePortS'>Build Reports from CRM data</h4>
                                    <p className='sanalysis_Para5'>Generate clean and precise reports with Finreify's<br /> CRM. Fill in the required information, set dimensions<br /> and metrics, and build your sales report from <br />scratch.</p>
                                </div>
                            </div>
                            <div className='mt-5 sanalysis_FifthGroup'>
                                <div className='sanalysis_fifthImg'>
                                    <img src={Customize} alt="custom" />
                                </div>
                                <div className='sanalysis_Build'>
                                    <h4 className='sanalysis_rePortS'>Customize existing Reports</h4>
                                    <p className='sanalysis_Para5'>Customize existing reports basis dimensions<br />, filters, and metrics to focus on the information<br /> that matters. Also view your report as a bar,<br /> pie-chart and line graph with a click of a button.</p>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mt-5 sanalysis_FifthGroup'>
                                <div className='sanalysis_fifthImg'>
                                    <img src={Download} alt="download" />
                                </div>
                                <div className='sanalysis_Build'>
                                    <h4 className='sanalysis_rePortS'>Quickly Download Report</h4>
                                    <p className='sanalysis_Para5'>Seamlessly export all your reports from Finreify CRM.<br /> Share them with other team members.Your CRM <br />automatically collects, organizes, and analyzes <br />important sales data.</p>
                                </div>
                            </div>
                            <div className='mt-5 sanalysis_FifthGroup'>
                                <div className='sanalysis_fifthImg'>
                                    <img src={Organized} alt="datarorganizedreporteport" />
                                </div>
                                <div className='sanalysis_Build'>
                                    <h4 className='sanalysis_rePortS'>Keep Your Reports Organized</h4>
                                    <p className='sanalysis_Para5'>Use view filters (prospects, deal, tasks, company, dates<br /> and call logs) to quickly find the reports you need. Also<br /> track your sales reports by day, week or month to compare <br />it with previous time periods.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------Fifth section ends here------------------------------------------ */}

            {/* --------------------Sixth Section----------------------- */}

            <div className='sanlysis_Sixthbackground'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5 sanalysis_FifthDiv'>
                            <div className='sanalysis_dashboardImage'>
                                <img src={dashboardanalysis} alt="analysisdash" />
                            </div>
                        </div>
                        <div className='col-md-5 sanalysis_sixthHeading'>
                            <div>
                                <h1 className='sanalysis_Salesdash'>Sales Dashboard</h1>
                                <p className='sanalysis_Para6'>Get real-time picture of your business’ productivity and sales progression with our sales Dashboard. Customize the dashboard with important metrics and reports as per your growing business’s requirement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --------------------Sixth Section ends here----------------------- */}

            {/* ------------------------Seventh Section--------------------------- */}

            <div className='container'>
                <div className='sanalysis_headinG7'>
                    <h1 className='sanalysis_Track'>Track Your Team Performance</h1>
                    <p className='sanalysis_Para7'>Gain useful insights on your team’s performance right from the sales dashboard. Identify the top performing <br />sales members and reward them; invest in training those members who are not able to perform well.</p>
                </div>
                <div className='mt-5 sanalysis_seventhGroup'>
                    <div className='sanalysis_SeventhImage'>
                        <img src={CRMdashboard} alt="dashBoardCRM" />
                    </div>
                    <div className='m-auto sanalysis_SeventhImage'>
                        <img src={Linegraph} alt="dashBoardCRM" />
                    </div>
                </div>
            </div>

            {/* ----------------------------Seventh section ends here----------------------------------- */}

            {/* ------------------------Eight Section--------------------------- */}

            <div className='sanalysis_eighthBackground'>
                <div className='container'>
                    <div className='sanalysis_headinG7'>
                        <h1 className='sanalysis_Benefits'>Benefits Of Sales Report</h1>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='sanalysis_customImg'>
                                <img src={teamPerformance} alt="performance" />
                            </div>
                            <div className='sanalysis_Text2233'>
                                <h3 className='mt-3 sanalysis_Clearer'>Gives clearer<br />understanding of<br />team’s performance</h3>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sanalysis_customImg'>
                                <img src={Target} alt="target" />
                            </div>
                            <div className='sanalysis_Text2233'>
                                <h3 className='mt-3 sanalysis_Clearer'>Helps set team and<br />company goals</h3>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sanalysis_customImg'>
                                <img src={Graphs} alt="index" />
                            </div>
                            <div className='sanalysis_Text2233'>
                                <h3 className='mt-3 sanalysis_Clearer'>Represents sales<br />insights as visual data<br />on dashboard</h3>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 row'>
                        <div className='col-md-4'>
                            <div className='sanalysis_customImg'>
                                <img src={Datadriven} alt="datadecisions" />
                            </div>
                            <div className='sanalysis_Text2233'>
                                <h3 className='mt-3 sanalysis_Clearer'>Help make data-<br />driven decisions</h3>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='sanalysis_customImg'>
                                <img src={Revenue} alt="forecasting" />
                            </div>
                            <div className='sanalysis_Text2233'>
                                <h3 className='mt-3 sanalysis_Clearer'>Forecasting revenue</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------Eight Section ends here--------------------------- */}

            {/* ---------------------------------Ninth Section------------------------------------ */}

            <div className='sanalysis_NinthBackground'>
                <div className='container'>
                    <div className='Ninthhheading'>
                        <h3 className='sanalysis_Start'>START USING</h3>
                        <h1 className='sanalysis_Using'>Start Using Finreify CRM</h1>
                        <p className='sanalysis_Fiveminutes'>It takes just 5 minutes to setup!</p>
                    </div>
                    <div className='mt-5 sanalysis_Buttongroup'>
                        <button className='btn sanalysis_dEMo'>Request Demo</button>
                        <button className='btn sanalysis_FreeTrial'>Start Free Trial</button>
                    </div>
                </div>
            </div>            

            {/* ---------------------------------Ninth Section Ends Here------------------------------------ */}

            <Footer/>
            
        </>
    )
}

export default Analysis