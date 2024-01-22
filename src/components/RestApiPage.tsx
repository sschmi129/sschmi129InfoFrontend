import React, { useEffect, useState } from 'react';
import { useLocation, redirect, Navigate, useNavigate } from 'react-router-dom';
import { Location } from "history";
import '../App.css';
import { buildGuestbookTable, buildModulesTable, /*buildUsersTable*/ } from './buildTable';
import { Guestbook, HrefProps, Module, Message, User } from './interfaces';
import { messageSubmit, modulesRequest, userRequest, messagesRequest, messageDelete, downloadFile, logoutRequest } from './request';
import { v4 as uuidv4 } from 'uuid';


const RestApiPage = ({ hrefLink }: HrefProps) => {

  const [user, setUser] = useState<User>({ username: 'placeholder' });
  const [modules, setModules] = useState<[Module]>();
  const [messages, setMessages] = useState<[Message]>();
  const location: Location = useLocation();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (logout === true) {
      navigate('/');
    }
  }, [navigate, logout]);


  return (
    <div className="sm:w-80 lg:w-10/12 mx-auto p-0 flex flex-col flex-nowrap justify-start">
      <div className="pt-6 lg:px-36">
        <h1 className="text-6xl font-bold">RestAPI Test</h1>
        <p className='text-lg pt-3'>
          Frontend: React<br />
          Backend: NodeJS, Express, JWT, SQLite, Let's Encrypt
        </p>
      </div>

      {/* Users */}
      <div className="lg:px-36 pt-6">
        <h2 className='text-xl font-bold'>User</h2>
        <div className="text-lg flex items-center">
          <p className='mr-1'>You are logged in as:</p>
          {isClicked ?
            <div className='py-2 px-3'>{user.username}</div>
            :
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
              id='getUserButton'
              onClick={(e) => userRequest({ hrefLink, setUser, location, setIsClicked })}
            >
              Click
            </button>
          }
        </div>


      </div>

      {/* Modules */}
      <div className="lg:pl-36 pt-6">
        <h2 className="text-xl font-bold">Modules</h2>
        <div className="text-lg flex items-center mb-1">
          <p className='mr-1'>Get modules information:</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => modulesRequest({ hrefLink, setModules, location })}
          >
            Retrieve
          </button>
        </div>
        <div className='overflow-auto'>
          {buildModulesTable(modules)}
        </div>
      </div>


      {/* Leave a message */}
      <div className="lg:pl-36 pt-6">
        <h2 className="text-xl font-bold">Leave a message</h2>
        <form className="" action=""
          onSubmit={
            (e) => {
              e.preventDefault();
              const textField = (e.target as HTMLFormElement)[0] as HTMLInputElement;

              const message = textField.value;
              if (message !== '') {
                messageSubmit({ hrefLink, message, setMessages, location });
              }
              textField.value = '';
            }
          }>
          <textarea
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-0.5"
            id="message"
            rows={3}
            placeholder="Your message"
          />
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Send"
          />

        </form>
      </div>





      {/*Get Messages*/}
      <div className="lg:pl-36 pt-6">
        <h2 className='text-xl font-bold'>Messages</h2>
        <button
          className="mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => messagesRequest({ hrefLink, setMessages, location })}
        >
          Get / Refresh
        </button>
        <div>
          {
            messages != null ? messages.map(
              (message, index) =>

                <div className="max-w-fit" key={uuidv4()}>
                  <p className="w-fit text-base bg-zinc-300 p-2 rounded-md" >{message.message}</p>
                  <button
                    className="text-sm mt-0.5 mb-1 bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded focus:outline-none focus:shadow-outline" id="xyz"
                    onClick={(e) => messageDelete({ hrefLink, messages, setMessages, index, location })}
                  >
                    Delete
                  </button>
                </div>

            ) : <></>
          }
        </div>
      </div>

      {/* files */}
      <div className="lg:pl-36 pt-6">
        <h2 className='text-xl font-bold'>Download Leistungsübersicht</h2>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => downloadFile({ hrefLink, location })}
        >
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>Download</span>
        </button>
      </div>
      <div className="lg:pl-36 pt-6">
        <button
          className="mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={
            (e) => {
              logoutRequest({ hrefLink, location, setLogout });
            }
          }
        >
          Logout
        </button>
      </div>


    </div>
  );
}

export default RestApiPage;
