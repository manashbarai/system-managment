import React from 'react'
import './Productivity.css'

import Footer from '../Footer'

import CXData from './Images/demographic_1877433.png'
import Streamline from './Images/iteration_5362013.png'
import Insights from './Images/vision_9609745.png'
import Dashboard from './Images/dashboardAnalysis.png'
import TickIcon from './Images/circle-check-solid.svg'

const Productivity = () => {
    return (
        <>
           

            {/* ---------------------------------First Section-------------------------------------------- */}

            <div className='sPro_Firstbackground'>
                <div className='container'>
                    <div className='row sPro_First'>
                        <div className='col-md-5 sPro_FirstOne'>
                            <h1 className='sPro_firstHeading'>The catalyst to get things done</h1>
                            <p className='sPro_firstPara'>Finreify CRM empowers you to track multiple tasks with ease and manage them efficiently. Moreover, you can automate task creation with Workflows.</p>
                            <div className='mt-5 sPro_Buttongroup'>
                                <button className='btn sPro_Getstarted'>Get Started With Finreify CRM</button>
                                <button className='btn sPro_Book'>Book A Demo</button>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-5 sPro_secondDiv'>
                        </div>
                    </div>
                </div>
            </div>

            {/* -------------------------------------------First Section ends here-------------------------------------- */}

            {/* -----------------------------------------Second Here---------------------------------------------- */}

            <div className='container'>
                <div className='sPro_Firstcontext'>
                    <h1 className='sPro_Why'>Why do I need CRM software?</h1>
                    <p className='sPro_FirstPara'>Good customer relationship management (CRM) software enables your business to better manage customer interactions, provide support, and maintain relationships through reliable systems and processes. It also integrates organizational processes across marketing, sales, and customer service with functionalities and features that can strategically serve key initiatives across departments.</p>
                </div>
            </div>

            {/* ---------------------------------------Second section ends here------------------------------------- */}

            {/* ----------------------------Third Section------------------------------ */}

            <div className='container'>
                <div className='sPro_thirdHeading'>
                    <h1 className='sPro_Heading3'><span className='sPro_numBer'>3</span> Major Benefits for Your Business</h1>
                </div>
                <div className='row sPro_Group3'>
                    <div className='col-md-4 sPro_Box111'>
                        <div className='sPro_Img333'>
                            <img src={CXData} alt="data" />
                        </div>
                        <div className='mt-3 sPro_Content2323'>
                            <h3 className='sPro_Easy'>Easy access to customer data</h3>
                            <p className='mt-3 sPro_ThirdPara'>CRM systems include searchable databases that allow users to access client and prospect information during meetings.</p>
                        </div>
                    </div>
                    <div className='col-md-4 sPro_Box111'>
                        <div className='sPro_Img333'>
                            <img src={Streamline} alt="process" />
                        </div>
                        <div className='mt-3 sPro_Content2323'>
                            <h3 className='sPro_Easy'>Streamlined processes</h3>
                            <p className='mt-3 sPro_ThirdPara'> CRM software lets users standardize workflows and processes associated with sales, marketing, and customer support to improve coordination between these teams.</p>
                        </div>
                    </div>
                    <div className='col-md-4 sPro_Box111'>
                        <div className='sPro_Img333'>
                            <img src={Insights} alt="action insights" />
                        </div>
                        <div className='mt-3 sPro_Content2323'>
                            <h3 className='sPro_Easy'>Actionable insights into business</h3>
                            <p className='mt-3 sPro_ThirdPara'> These reports help in segmenting customers, tracking revenue, and managing a marketing campaign.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------Third Section ends here------------------------------- */}

            {/* ---------------------------------Fourth Section------------------------------------------- */}

            <div className='sPro_fourthBackground'>
                <div className='container'>
                    <div className='row sPro_fourthRow'>
                        <div className='col-md-6 sPro_Fourth'>
                            <div className='sPro_fourthHeading'>
                                <h1 className='sPro_FourthHeading'>Simplified monitoring<br /> with charts</h1>
                                <p className='mt-4 sPro_Para4'>Visually assess project statuses through charts. Add tasks or <br />milestones directly to the charts.Alter the time range or zoom <br />into the chart to analyze tasks in different timelines.Changing<br /> the start or end date of tasks is as easy as just dragging it.</p>
                            </div>
                        </div>
                        <div className='col-md-6 sPro_FOurthDiv'>
                            <div className='sPro_Image4'>
                                <img src={Dashboard} alt="monitoring" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------------Fourth Section ends Here--------------------------------- */}

            {/* ----------------------------------------------Fifth Section------------------------------------------ */}

            <div className='sPro_fifthbackground'>
                <div className='container'>
                    <div className='row sPro_fifthRow'>
                        <div className='col-md-6 sPro_fifthDiv'>
                            <div className='sPro_Image5'>
                                <img src={Dashboard} alt="monitoring" />
                            </div>
                        </div>
                        <div className='col-md-6 sPro_Fifth'>
                            <div className='sPro_fifthHeading'>
                                <h1 className='sPro_FifthHeading'>Notifications keep project<br /> members updated</h1>
                                <p className='mt-4 sPro_Para5'>Users can automatically be notified on-screen, via email,<br /> or through calendars about approaching deadlines on<br /> tasks assigned to them. Use mentions in comments to<br /> notify users on-screen.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------------------------------Fifth Section ends here------------------------------------------ */}

            {/* -----------------------------------Sixth section----------------------------------------- */}

            <div className='sPro_Sixthbackground'>
                <div className='container'>
                    <div className='row sPro_Row'>
                        <div className='col-md-6 sPro_sixthHeadinG'>
                            <div className='sPro_SixthHeading'>
                                <h1 className='sPro_Heading6'>Develop effective notetaking</h1>
                                <p className='mt-3 sPro_Para6'>Meeting notes are crucial to capturing information about a deal,but<br />  it’s an art to write them in a way that captures valuable information<br /> quickly and makes them accessible to everyone.Improving your<br /> notetaking skills can improve your productivity by making the follow<br />-up process a lot easier. A good CRM will help you hone these skills<br /> with notes linked to deals and leads.</p>
                            </div>
                        </div>
                        <div className='col-md-6 sPro_sixthHeadinG'>
                            <div className='sPro_Group8899'>
                                <img src={TickIcon} alt="icon" />
                                <p className='sPro_SixthPara'><span className='sPro_Use'>Use effective headings :</span> Make notes more accessible by highlighting important sections such as “Follow-up activity” or “Client targets”.</p>
                            </div>
                            <div className='sPro_Group8899'>
                                <img src={TickIcon} alt="icon" />
                                <p className='sPro_SixthPara'><span className='sPro_Use'>Write with your colleagues in mind :</span> Sharing information so that everyone gets value from it makes it easier to collaborate and forces you into good habits.</p>
                            </div>
                            <div className='sPro_Group8899'>
                                <img src={TickIcon} alt="icon" />
                                <p className='sPro_SixthPara'><span className='sPro_Use'>Know what you need to record from each meeting :</span> This will inform your qualification and follow-up practices.</p>
                            </div>
                            <div className='sPro_Group8899'>
                                <img src={TickIcon} alt="icon" />
                                <p className='sPro_SixthPara'><span className='sPro_Use'>Be succinct :</span> Short sentences and bullet points can help you capture information quickly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* -----------------------------------Sixth section ends here----------------------------------------- */}

            {/* -----------------------------------Seventh Section----------------------------------- */}

            <div className='sPro_Seventhbackground'>
                <div className='container'>
                    <div className='sPro_SeventhBox'>
                        <div className='sPro_Seventhheading'>
                            <h1 className='sPro_Heading7'>Ready to dive in?</h1>
                            <h1 className='sPro_Started'>Get started with Finreify CRM</h1>
                        </div>
                        <div className='sPro_Button7'>
                            <button className='btn sPro_Trial'>Start free trial</button>
                            <button className='btn sPro_TryDemo'>Try Demo</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* -----------------------------------Seventh Section ends here----------------------------------- */}

            <Footer />


        </>
    )
}

export default Productivity