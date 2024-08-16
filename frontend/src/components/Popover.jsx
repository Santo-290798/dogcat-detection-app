import { OverlayTrigger, Popover } from 'react-bootstrap';

const MyPopover = ({ id, children, popover_header, popover_body }) => {
    const popover = (
        <Popover id={id}>
            <Popover.Header as='div' className='app-description fs-6 fw-medium'>{popover_header}</Popover.Header>
            <Popover.Body className='app-description fs-6'>{popover_body}</Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger
            overlay={popover}
            trigger='focus'
            placement='auto'
        >
            {children}
        </OverlayTrigger>
    );
};

export default MyPopover;