import { createContext, useState } from "react";

export const StoreContext = createContext({
    setCurrentPage(currentPage) { },
    
    setListWorkers(listWorkers) {},
    setPerson(person) {}
});

const StoreProvider = ({ children }) => {
    // thuc hien cac chuc nang filter 
    const [currentPage, setCurrentPage] = useState(null);
    const [person, setPerson] = useState({});
    // truyền state và dispatch xuống dưới
    const [listWorkers, setListWorkers] = useState([]);
    return <StoreContext.Provider value={
        {
            currentPage,
            person,
            listWorkers,
            setCurrentPage: (currentPage) => {
                setCurrentPage(currentPage);
            },

            setListWorkers: (listWorkers) => {
                setListWorkers(listWorkers);
            },
            
            setPerson: (person) => {
                setPerson(person);
            }
        }
    }>{children}</StoreContext.Provider>;
}

export default StoreProvider;