import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function UserList() {

    const [ users, setUsers ] = useState([]);
    const [ lastId, setLastId ] = useState(0);
    const [ tempId, setTempId ] = useState(0);
    const [ limit, setLimit ] = useState(20);
    const [ keyword, setKeyword ] = useState("");
    const [ query, setQuery ] = useState("");
    const [ hasMore, setHasMore ] = useState(true);


    const getAllUsers = async() => {
        const response = await axios.get(`http://localhost:5000/users?search=${keyword}&lastId=${lastId}&limit=${limit}`);

        const newUsers = response.data.result;
        setUsers([ ...users, ...newUsers ]);
        setTempId(response.data.lastId);
        setHasMore(response.data.hasMore);
    }

    useEffect(() => {
        getAllUsers();
    },[lastId, keyword]);

    const fetchMore = () => {
        setLastId(tempId);
    }

    const serchData = (e) => {
        e.preventDefault();
        setLastId(20);
        setUsers([]);
        setKeyword(query);
    }

  return (
    <div className='container mx-auto px-20'>
        <form className="mb-2" onSubmit={serchData}>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            >
                Search
            </button>
            </div>
        </form>

       <InfiniteScroll
        dataLength={users.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
       >

        <table className='table-auto w-full border-collapse text-slate-500'>
        <thead> 
            <tr>
                <td className='px-1 py-2 border bg-gray-100 border-gray-500 text-center font-medium'>No</td>
                <td className='px-4 py-2 border bg-gray-100 border-gray-500 font-medium'>Nama</td>
                <td className='px-4 py-2 border bg-gray-100 border-gray-500 font-medium'>Email</td>
                <td className='px-4 py-2 border bg-gray-100 border-gray-500 font-medium'>Gender</td>
            </tr>
        </thead>
        <tbody>
            {
                users.map((data, i) => (
                    <tr key={i}>
                        <td className='px-1 py-2 border border-gray-300 text-center'>{ i + 1 }</td>
                        <td className='px-4 py-2 border border-gray-300'>{data.name}</td>
                        <td className='px-4 py-2 border border-gray-300'>{data.email}</td>
                        <td className='px-4 py-2 border border-gray-300'>{data.gender}</td>
                    </tr>
                ))
            }   
        </tbody>
    </table>
        </InfiniteScroll>
    </div>
  )
}
