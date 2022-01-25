import { useEffect, useState } from 'react';
import './Admin.css'
import { Button, Modal } from 'react-bootstrap';

export default function Admin({ candidate1, candidate2, resultStat, declareResults }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeclareResults = () => {
        declareResults();
    }

    useEffect(() => {
        return () => {
            <>
                <h4>Results are Declared</h4>
                <h2>{candidate1.votecount > candidate2.votecount ? candidate1.name : candidate2.name} won the Election</h2>
            </>
        }
    }, [resultStat])

    return (
        <div className='container'>
            <div className='mt-2'>
                <h3>Admin Panel</h3>
            </div>
            <div className="text-center">
                <h2 className='border-bottom border-5 border-dark pb-2'>Vote Count</h2>
                <div className="container d-flex justify-content-center">
                    <table className="table admin-table w-50 mt-3" style={{ tableLayout: "fixed" }}>
                        <thead className="">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{candidate1.name}</td>
                                <td>{candidate1.votecount}</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>{candidate2.name}</td>
                                <td>{candidate2.votecount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {resultStat ? <>
                <h4>Results are Declared</h4>
                <h2>{candidate1.votecount > candidate2.votecount ? candidate1.name : candidate2.name} won the Election</h2>
            </> :
                <div className="text-center">
                    <Button variant="primary" onClick={handleShow}>
                        Declare Results
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton className='border-0'>
                            <Modal.Title>Declare the Results</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer className='border-0'>
                            <Button variant="danger" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="success" onClick={handleDeclareResults}>
                                Declare
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>}
        </div>
    )
}
