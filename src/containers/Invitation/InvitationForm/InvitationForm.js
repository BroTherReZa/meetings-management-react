import React, { useEffect } from "react";
import Wrapper from "../../../components/hoc/Wrapper";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { connect } from "react-redux";
import { DatePicker } from "jalali-react-datepicker";
import SearchParticipants from "../../../components/parts/Participants/SearchParticipants/SearchParticipants";
import "./InvitationForm.css";
import ParticipantsList from "../../../components/parts/Participants/ParticipantsList/ParticipantsList";
import axios from "../../../utils/Firebase/axios";
import { checkValidation } from "../../../utils/Validators/Validators";
import NewParticipants from "../../../components/parts/Participants/NewParticipants/NewParticipants";

const InvitationForm = (props) => {
  // useEffect(()=>{
  //   axios
  //   .get("/contacts.json")
  //   .then((res) => {
  //     console.log("load DB", res.data);
  //     if (res.data) {
  //       const contactList = Object.values(res.data);
  //       props.getContacts(contactList);
  //     }
  //   });
  //   console.log('run effect')
  // },[props.contactForm])

  const elementsArray = [];
  for (let item in props.invitation.form) {
    elementsArray.push({
      id: item,
      config: props.invitation.form[item],
    });
  }

  const setMeetingDateHandler = ({ value }) => {
    //const meetingDate = Object.values(value)[4];
    props.setMeetingDate("دوشنبه ۱۶ آذر"); // need to update
    props.setMeetingTime("ساعت ۱۰:۳۰"); // need to update
  };

  const inputChangeHandler = (event, inputElement) => {
    const updatedForm = {
      ...props.invitation.form,
    };
    const updatedElement = { ...updatedForm[inputElement] };
    updatedElement.value = event.target.value;
    updatedElement.valid = checkValidation(
      updatedElement.value,
      updatedElement.vaildation
    );
    updatedElement.used = true;
    updatedForm[inputElement] = updatedElement;
    props.onChangeInput(updatedForm);
  };

  const addNewContactHandler = (newContact) => {
    const updatedParticipants = [...props.invitation.participants];
    updatedParticipants.push(newContact);
    props.setContact(updatedParticipants);
    console.log(props.invitation.participants)
  };

  const invitationSubmitHandler = (event) => {
    event.preventDefault();
    const meeting = {
      meetingId: props.invitation.id,
      subject: props.invitation.form.subject.value,
      host: props.invitation.form.host,
      minute: props.invitation.form.minute.value,
      meetingRoom: props.invitation.form.room.value,
      meetingRoomAddress: props.invitation.form.roomAddress,
      meetingDate: props.invitation.date,
      meetingTime: props.invitation.time,
      participants: props.invitation.participants,
    };
    axios
      .post("/meetings.json", meeting)
      .then((res) => {
        console.log("ok", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <div className="invitation">
        <h1>فرم دعوت به جلسه</h1>
        <form onSubmit={invitationSubmitHandler}>
          <DatePicker
            label="تاریخ و ساعت جلسه :"
            onClickSubmitButton={setMeetingDateHandler}
          />
          {elementsArray.map((item) => (
            <Input
              key={item.id}
              inputType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              invalid={!item.config.valid}
              used={item.config.used}
              change={(event) => inputChangeHandler(event, item.id)}
            />
          ))}
          <SearchParticipants />
          <NewParticipants submit={addNewContactHandler} />
          <Button btnType="form">تنظیم جلسه</Button>
        </form>
        <ParticipantsList list={props.invitation.participants} />
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    invitation: state.invitation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeInput: (updatedForm) =>
      dispatch({
        type: "INVITATIONINPUTCHANGE",
        payload: { data: updatedForm },
      }),
    setMeetingDate: (meetingDate) =>
      dispatch({
        type: "SETMEETINGDATE",
        payload: { data: meetingDate },
      }),
    setMeetingTime: (meetingTime) =>
      dispatch({
        type: "SETMEETINGTIME",
        payload: { data: meetingTime },
      }),
    setContact: (updatedParticipants) =>
      dispatch({
        type: "SETCONTACT",
        payload: { data: updatedParticipants },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InvitationForm);
