import { Button, Row, Col } from 'antd';

import FPCard from '@/components/FPCard';

import { useModal } from '@/hooks/useModal';
import ContactUsFormModal from '@/sections/Modals/ContactUsModal';
function ContactCard() {
    const { open, openModal, closeModal } = useModal();

    return (
        <>
            <ContactUsFormModal open={open} closeModal={closeModal} />
            <FPCard className="mt-1 mb-2 card-shadow">
                <Row className=" flex items-center">
                    <Col
                        className="font-normal text-base sm:text-lg text-main-textGray"
                        xs={24}
                        sm={24}
                        md={18}
                        lg={18}
                    >
                        73% of users contacted us for customized solutions
                    </Col>
                    <Col className="text-right" xs={24} sm={24} md={6} lg={6}>
                        <Button
                            className="mr-1"
                            type="primary"
                            onClick={openModal}
                        >
                            Contact Us
                        </Button>
                    </Col>
                </Row>
            </FPCard>
        </>
    );
}

export default ContactCard;
