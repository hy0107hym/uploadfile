import {BrowserRouter, Routes, Route} from 'react-router-dom'
import * as pages from './pages'

const Routers = () => {
    return(
        <BrowserRouter>
            <Routes>
            <Route exact path='/' element={<pages.HomePage/>}></Route>
                <Route exact path='/item' element={<pages.ItemPage/>}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default Routers