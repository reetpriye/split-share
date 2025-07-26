import { CSSTransition } from 'react-transition-group'

import './styles/Message.css'

const Message = ({ variant, children }) => {
  return (
    <CSSTransition
      in={true}
      classNames={'alert-'}
      timeout={{ enter: 1000, exit: 1000 }}
      appear={true}
    >
      <div key={alert.id} className={`alert alert-${variant}`}>
        <p>
          <i className='fas fa-info-circle' /> {children}
        </p>
      </div>
    </CSSTransition>
  )
}

export default Message
