import Introduction from "./home/Introduction";
import ApplyLoan from "./home/ApplyLoan";
import Works from "./home/Working";
import Glance from "./home/Glance";
import './home/Introduction.css';
import './home/ApplyLoan.css';

const Mainpage = () =>{
    return(
        <>
        <Introduction/>
        <ApplyLoan/>
         <Works/>
         {/* <Glance/> */}
        </>
    )
}

export default Mainpage;