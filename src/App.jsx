import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "~/pages/404/NotFound";
import Board from "~/pages/Boards/_id";

function App() {
    return (
        <Routes>
            {/* Redirect Route*/}
            <Route
                path="/"
                element={
                    // replace giá trị true để nó sẽ thay thế route /, là route / sẽ không còn nằm trong history của Browser
                    <Navigate
                        to="/boards/67e0b0e9e39fefaf98d82e33"
                        replace={true}
                    />
                }
            />
            {/* Board Detail */}
            <Route path="/boards/:boardId" element={<Board />} />;
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;

// React router dom /boards/boards/{board_id}
