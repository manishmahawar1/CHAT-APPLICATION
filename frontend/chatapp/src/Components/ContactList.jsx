import { useEffect } from "react";
import useChatStore from "../Store/useChatStore"
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import useAuthStore from "../Store/useAuthStore";


function ContactList() {
  const { getAllContacts, allContact, setSelectUser, isUserLoading, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();


  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UserLoadingSkeleton />;






  return (
    <>
      {allContact.map((contact) => (
      <div
        key={contact._id}
        className={`gap-3 bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors ${selectedUser ? "hidden md:flex" : ""}`}
        onClick={() => setSelectUser(contact)}
      >
        <div className="flex items-center gap-3">
          <div className={`avatar ${onlineUsers.includes(contact._id) ? "avatar-online" : "avatar-offline"}`}>
            <div className="size-12 rounded-full">
              <img src={contact.profilePic || "/avatar.png"} />

            </div>
          </div>
          <h4 className="text-slate-200 font-medium">{contact.name}</h4>
        </div>
      </div>
      ))}
    </>
  );




}
export default ContactList;