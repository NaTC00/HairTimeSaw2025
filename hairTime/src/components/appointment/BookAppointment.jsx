import EditCalendar from 'components/EditCalendar';
import OptionsSelector from 'components/OptionsSelector';
import '../../styles/colors.css';
import EditInputText from "../EditInputText";
import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import MultiSelectDropdown from "../MultiSelectDropdown"
import {useServices} from "../../contexts/ServicesContext"
import {getSlotAvailable} from "../../httpManager/request"
import DropDown from "../DropDown"
function BookAppointment() {
   

    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [sectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [showSelectedTimeSlot, setShowSelectedTimeSlot] = useState(false);
    const [selectedServices, setselectedServices] = useState([]);
    const [showMenuServices, setshowMenuServices] = useState(false);
    const { services, loadServices } = useServices();
    const [availableSlots, setAvailableSlots] = useState({});
    const [enabledDates, setEnabledDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);


    useEffect(() => {
      loadServices();
      
    }, []);



    const handleDateChanged = (date) => {
      const formatted = formatDate(date)
      setSelectedDate(date)
      setShowCalendar(false)
      
       const slots = availableSlots[formatted] || [];
      console.log(`slots ${slots}`)
      setTimeSlots(slots);
    }



    const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(selectedDate);

    

    const handleTimeSlotChange = (slot) => {
         console.log("Orario selezionato:", slot);
        setSelectedTimeSlot(slot)
        setShowSelectedTimeSlot(false)
    }

    const fakeTimeSlots = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "16:00 - 17:00",
        "17:00 - 18:00"
    ];

   
    const handleServiceConfirm = async (selected) => {
      try{

        const slotData = await getSlotAvailable(selected)
        setAvailableSlots(slotData)

       const enabledDates = Object.keys(slotData).map(dateStr => new Date(dateStr));
       setEnabledDates(enabledDates);
        console.log("Slot disponibili ricevuti:", slotData)
      }catch (error){
        console.log("Errore durante il recuper degli slot:", error)
      }
    }

    


    const handleServiceChange = (selected) => {
      setselectedServices(selected); 
    };


    const commonProps = {
    borderColor: "var(--secondary)",
    focusColor: "var(--orange)",
    backgroundColor: "var(--background_cream)",
    textColor: "var(--secondary)",
    size: "lg"
    };

  return (
    <Container fluid className="py-5">
      <Row className="align-items-start">
        {/* Colonna sinistra - Testo */}
        <Col lg={4} className="mb-4">
          <h1 className="mb-3">Prenota un appuntamento online</h1>
          <p className="mb-4">
            Compila i campi per prenotare il tuo servizio.
          </p>
        </Col>

        {/* Colonna destra - Form */}
        <Col lg={8}>
          <Row className="mb-3">
            <Col md={4}>
              <EditInputText {...commonProps} label="Nome" placeholder="Nome" inputType="text" />
            </Col>
            <Col md={4}>
              <EditInputText {...commonProps} label="Email" placeholder="email" inputType="email" />
            </Col>
            <Col md={4}>
              <EditInputText {...commonProps} label="Numero di telefono" placeholder="(083) 632-5556" inputType="tel" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
            
              <MultiSelectDropdown
                  {...commonProps}
                  label="Servizi"
                  placeholder="Seleziona servizio"
                  options={services}
                  onChange={handleServiceChange}
                  value={selectedServices}
                  buttonLabel={"Invia"}
                  onConfirmSelection={handleServiceConfirm}
                />

              

            
            </Col>
            <Col md={4}>
              <EditInputText 
              {...commonProps} 
              label="Data" 
              placeholder="gg-mm-aaaa" 
              inputType="text" 
              readOnly 
              value={formattedDate} 
              onClick={() => setShowCalendar(true)}
              showCustomComponent={showCalendar}
              customComponent={
                <EditCalendar
                  value={selectedDate || new Date()}
                  onChange={handleDateChanged}
                  enabledDates={enabledDates}
                />

                

              }
              />
            </Col>
            <Col md={4}>
                <OptionsSelector {...commonProps} label="Orario" placeholder="Seleziona una fascia oraria" values={timeSlots} onSelect={handleTimeSlotChange} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BookAppointment;
