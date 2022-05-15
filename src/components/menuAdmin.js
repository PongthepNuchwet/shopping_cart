import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Menu() {
    return (
        <>
            <br />
            <Link to="/admin">
                <button>
                    Home
                </button>
            </Link>
            <Link to="/admin/order">
                <button>
                    Order
                </button>
            </Link>
            <Link to="/admin/announce">
                <button>
                    Announce
                </button>
            </Link>
            <Link to="/admin/stock">
                <button>
                    Stock
                </button>
            </Link>

        </>
    )
}