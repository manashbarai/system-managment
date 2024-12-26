import React from 'react'
import './Sales.css'
import Navbar from '../Navbar'
import Footer from '../Footer'

import Tickicon from './Images/circle-check-regular.svg'
import Leadsicon from './Images/Lead-scoring.svg'
import Notification from './Images/Notifications.svg'
import Rolebased from './Images/Role-based-permissions.svg'
import Workflow from './Images/Sales-workflows-1.svg'
import SalesRegime from './Images/Sales-regimentation.svg'
import Workplanning from './Images/Workday-planning-1.svg'
import Report from './Images/Reports.svg'
import Api from './Images/APIs.svg'
import Page1 from './Images/page1.png'
import Dashboard from './Images/dashboard.png'
import Correct from './Images/circle-check-solid.svg'

const Sales = () => {
    return (
        <>

   

            {/* ----------------------------------First Section------------------------------------------ */}

            <div className='ssales_Firstbackground'>
                <div className='container'>
                    <div className='row ssales_First'>
                        <div className='col-md-5 ssales_FirstOne'>
                            <h1 className='ssales_firstHeading'>Finreify CRM Software.<br />Drive High-velocity Sales <br />with Ease.</h1>
                            <p className='ssales_firstPara'>A one-stop platform for all your inside sales, call center<br /> agents, feet-on-street (sales, partner onboarding, service), operations, and marketing teams.</p>
                            <div className='ssales_List'>
                                <ul className='sales_Listorder'>
                                    <li className='sales_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;Flexible</li>
                                    <li className='mt-2 sales_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;Fast adaption</li>
                                    <li className='mt-2 sales_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;Great support</li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-2'></div>
                        <div className='col-md-5 ssales_secondDiv'>
                            <div className='ssales_Form'>
                                <div className="row">
                                    <h1 className='mb-3 ssales_We'>We’re here to answer all your questions!</h1>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control ssales_Inputbox" placeholder="First name" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control ssales_Inputbox" placeholder="Last name" />
                                    </div>
                                </div>
                                <div className="mt-3 ssales_Mail">
                                    <input type="email" className="form-control ssales_Inputbox" placeholder="Enter your Email" />
                                </div>
                                <div className="mt-3 ssales_Phone">
                                    <input type="tel" className="form-control ssales_Inputbox" placeholder="Enter your Mobile Number" />
                                </div>

                                <div className="mt-3 ssales_Teaxtarea">
                                    <textarea class="form-control ssales_Inputbox" placeholder='Your Requirements...' rows="4">
                                    </textarea>
                                </div>
                                <div className='mt-4 ssales_Button'>
                                    <button type="button" className="ssales_requestbtn btn">Request a Demo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------------First Section Ends here------------------------------------------ */}

            {/* ------------------------------------------Second Section------------------------------------- */}

            <div className='ssales_Secondbackground'>
                <div className='container'>
                    <div className='ssales_SecondHeading'>
                        <h1 className='ssales_Feature'>A Feature-packed CRM for Sales</h1>
                        <p className='ssales_Para1'>Literally! You don’t have to spend time on operational tasks that don’t involve directly<br />interacting with customers. Everything you need. Nothing you don’t.</p>
                    </div>
                    <div className='row ssales_Group111'>
                        <div className='col-md-3 ssales_Box1111'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Leadsicon} alt="leads" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Lead scoring</h2>
                                    <p className='mt-3 ssales_Para2'>Qualify and prioritize.<br /> Distribute accordingly. 100%<br /> automated.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Notification} alt="notification" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Notifications</h2>
                                    <p className='mt-3 ssales_Para2'>Create alerts & reminders for<br /> tasks assigned, follow-ups,<br /> meetings, and more</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Rolebased} alt="role" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Role-based</h2>
                                    <p className='mt-3 ssales_Para2'>Distraction-free, secure. Sales reps see only their leads, tasks, & metrics.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Workflow} alt="workflow" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Sales Workflow</h2>
                                    <p className='mt-3 ssales_Para2'>No code. Create <br />workflows for all sales processes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={SalesRegime} alt="sales" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Sales regimentation</h2>
                                    <p className='mt-3 ssales_Para2'>Set up processes. Assign targets. Track achievements. Reward champions.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Workplanning} alt="workplanning" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Workday planning</h2>
                                    <p className='mt-3 ssales_Para2'>Assign tasks for the day, and plan meeting routes for your staff.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Report} alt="report" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>Reports</h2>
                                    <p className='mt-3 ssales_Para2'>Measure everything that’s important to you.Ready reports and dashboards.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 ssales_Box1122'>
                            <div className='ssales_Box1'>
                                <div className='ssales_Leadimg'>
                                    <img src={Api} alt="api" />
                                </div>
                                <div className='mt-3 ssales_Content11'>
                                    <h2 className='ssales_Scoring'>APIs</h2>
                                    <p className='mt-3 ssales_Para2'>Integrate what you need. Native connectors, robust APIs, & developer platform.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------Second Section ends here------------------------------------- */}

            {/* -----------------------------------Third Section------------------------------------------------- */}

            <div className='ssales_Thirdbackground'>
                <div className='container'>
                    <div className='ssales_Thirdheading'>
                        <h1 className='ssales_Run'>Run Your Sales on Autopilot</h1>
                        <p className='ssales_Multiple'>Multiple products, teams, and sales processes—manage everything within one platform</p>
                    </div>
                    <div className='ssales_ThirdContent'>
                        <div className='row ssales_rowSection'>
                            <div className='col-md-5 ssales_thirdContext'>
                                <div className='ssales_thirdHead'>
                                    <h1 className='ssales_leadManage'>Lead management</h1>
                                    <p className='ssales_Para3'>From capturing to qualifying, tracking activities, and routing, gain full control of your sales leads with Finreify’s CRM. </p>
                                    <ul className='mt-3 p-4'>
                                        <li className='ssales_thirdList'>Help you focus on sales-ready leads.</li>
                                        <li className='mt-2 ssales_thirdList'>Provides you with the context for better engagement.</li>
                                        <li className='mt-2 ssales_thirdList'>It helps you improve response time.</li>
                                        <li className='mt-2 ssales_thirdList'>Provides sharper insights and reports.</li>
                                        <li className='mt-2 ssales_thirdList'>Real-time tracking of customers in the sales funnel.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-5 ssales_thirdContext'>
                                <div className='ssales_Img1'>
                                    <img src={Page1} alt="page" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* -----------------------------------Third Section ends here------------------------------------------------- */}

            {/* -------------------------------------Fourth Section------------------------------------------------- */}

            <div className='ssales_Fourthbackground'>
                <div className='container'>
                    <div className='ssales_FourthContent'>
                        <div className='row ssales_fourthRow'>
                            <div className='col-md-5 ssales_FouthDiv'>
                                <div className='ssales_Img2'>
                                    <img src={Dashboard} alt="dashboard" />
                                </div>
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-5 ssales_fourthContext'>
                                <div className='ssales_fourthHead'>
                                    <h1 className='ssales_leadManage'>Sales Management</h1>
                                    <p className='ssales_Para3'>Monitor every aspect of your sales process – leads, funnel, salespeople, and revenue.</p>
                                    <ul className='mt-3 p-4'>
                                        <li className='ssales_fourthList'><span className='ssales_Smart'>Smart Views:</span> Declutter salespeople’s work area. Reps see only their tasks listed in order of priority.</li>
                                        <li className='mt-2 ssales_fourthList'><span className='ssales_Smart'>Process Automation:</span>Plan, configure, and control your entire sales process with our drag-and-drop workflow builder.</li>
                                        <li className='mt-2 ssales_fourthList'><span className='ssales_Smart'>Sales Management:</span> Define sales territories, user hierarchies, and goals for your team.</li>
                                        <li className='mt-2 ssales_fourthList'><span className='ssales_Smart'>Role-based permission for sales reps:</span>Control who sees what and which users can edit, delete, export, or import your data</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* ----------------------------------------------Fourth Section ends Here------------------------------------ */}

            {/* ----------------------------Fifth Section------------------------------------ */}

            <div className='ssales_Fifthbackground'>
                <div className='container'>
                    <div className='row ssales_fifthRow'>
                        <h1 className='ssales_Reports'>Reports</h1>
                        <div className='col-md-5 ssales_FifthDiv'>
                            <div className='fifthHeading'>
                                <p className='ssales_Para5'>Gain insights into all aspects of your business—product, people, and processes. Track important sales metrics in real-time. Generate role-based reports in one click. Allow user to monitor their progress, managers to check team performance, marketing teams to gain insights on campaigns, conversions, and customers, and more. Ensure everyone is on track with your sales and revenue goals.</p>
                            </div>
                            <div className='mt-4 ssales_Dashimg'>
                                <img src={Dashboard} alt="dashboard" />
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-5 ssales_fifthDiv2'>
                            <p className='ssales_Para5'>Generate reports as per the role of salesperson in CRM in just a click.</p>
                            <div className='mt-5 row'>
                                <div className='col'>
                                    <div className='ssales_fifthContext'>
                                        <img src={Correct} alt="tick" />
                                        <h3 className='ssales_Conversation'>Conversation tracking</h3>
                                    </div>
                                    <div className='mt-3'>
                                        <p className='ssales_Keep'>Keep track of emails,<br />messages, texts sent by your team, as well as their open & click rates.</p>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='ssales_fifthContext'>
                                        <img src={Correct} alt="tick" />
                                        <h3 className='ssales_Conversation'>Pipeline reports</h3>
                                    </div>
                                    <div className='mt-3'>
                                        <p className='ssales_Keep'>Track the number of leads in each stage of the pipeline for your teams and reps.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2 row'>
                                <div className='col'>
                                    <div className='ssales_fifthContext'>
                                        <img src={Correct} alt="tick" />
                                        <h3 className='ssales_Conversation'>Meetings</h3>
                                    </div>
                                    <div className='mt-3'>
                                        <p className='ssales_Keep'>Keep a tab on the call volume, connect rate, and successful conversation numbers.</p>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='ssales_fifthContext'>
                                        <img src={Correct} alt="tick" />
                                        <h3 className='ssales_Conversation'>Sales closure reports</h3>
                                    </div>
                                    <div className='mt-3'>
                                        <p className='ssales_Keep'>Keep a tab on all the deals your reps have closed against their commitment.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ----------------------------------Fifth Section Ends here---------------------------- */}

            {/* --------------------------------------------Sixth Section------------------------------------ */}
            <div className='ssales_SixthBackground'>
                <div className='container'>
                    <div className='Sixthhheading'>
                        <h3 className='ssales_Start'>START USING</h3>
                        <h1 className='ssales_Using'>Start Using Finreify CRM</h1>
                        <p className='ssales_Fiveminutes'>It takes just 5 minutes to setup!</p>
                    </div>
                    <div className='mt-5 ssales_Buttongroup'>
                        <button className='btn ssales_dEMo'>Request Demo</button>
                        <button className='btn ssales_FreeTrial'>Start Free Trial</button>
                    </div>
                </div>
            </div>
            {/* --------------------------------Sixth Section ends Here------------------------------------------------ */}

            <Footer />


        </>
    )
}

export default Sales