import React, { useState } from "react";

export default function Content({ candidate1, candidate2, /*votingstat,*/ currentAccount, vote, resultStat }) {
    const [selectedCandidate, setSelectedCandidate] = useState();
    
    const handleSelect = (e) => {
        setSelectedCandidate(e.target.value);
    }

    const handleSubmit = (e) => {
        if ([candidate1.id, candidate2.id].includes(selectedCandidate)) {
            vote(Number(selectedCandidate));
        }
        else {
            alert('Error in Vote Submission');
        }
    }

    return (
        <div className="container mt-5">
            <div className="container">
                <p className="fs-5">Voting id : <b>{currentAccount}</b></p>
            </div>
            {resultStat ?
                <>
                    <h4>Results are Declared</h4>
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
                    <h2>{candidate1.votecount > candidate2.votecount ? candidate1.name : candidate2.name} won the Election</h2>
                </> :
                (/*votingstat==true ?
                    <div className="container">
                        <h3>You have voted</h3>
                        <h6>Thank you for voting</h6>
                    </div> :*/
                    <div className="container">
                        <h3 className="fs-1">Caste your Vote</h3>
                        <div className="mt-3">
                            <div>
                                <div className="form-check fs-5">
                                    <input className="form-check-input" onChange={handleSelect} value={candidate1.id} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        {candidate1.name}
                                    </label>
                                </div>
                                <div className="form-check fs-5">
                                    <input className="form-check-input" onChange={handleSelect} value={candidate2.id} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        {candidate2.name}
                                    </label>
                                </div>
                            </div>
                            <button className="btn btn-success mt-3 col-md-1" type="submit" onClick={handleSubmit}>Vote</button>
                        </div>
                    </div>)
            }
        </div>
    );
}
