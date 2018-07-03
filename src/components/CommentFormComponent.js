import React, {Component} from 'react';
import {Row, Col, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

const maxLength  = (len) => (val) => !(val) || (val.length <=len);
const minLength  = (len) => (val) => (val) && (val.length >=len);

class CommentFormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCommentFormOpen:false

		}
		this.toggleForm = this.toggleForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(values) {
		alert(JSON.stringify(values));
	}
	toggleForm() {
		this.setState({
			isCommentFormOpen: !this.state.isCommentFormOpen
		})
	}

	render() {
		return(
		<React.Fragment>
			 <Modal isOpen= {this.state.isCommentFormOpen} >
		        	<ModalHeader >Submit Comment</ModalHeader>
			        	<ModalBody>
			        		<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
	                            <Row className="form-group">
	                                <Label htmlFor="rating" md={12}>Rating </Label>
	                                <Col md={12}>
	                                	<Control.select model=".rating" className="form-control" >
	                                        <option> 1</option>
	                                        <option>2 </option>
	                                        <option> 3</option>
	                                        <option>4 </option>
	                                        <option> 5</option>
	                                    </Control.select>
	                                </Col>
	                            </Row>
	                            <Row className="form-group">
	                                <Label htmlFor="yourname" md={12}>Your Name </Label>
	                                <Col md={12}>
	                                    <Control.text model=".yourname" className="form-control"  id="yourname"  name="yourname" validators={{ minLength: minLength(3), maxLength:maxLength(15)}}/>
	                                    <Errors className="text-danger" model=".yourname" show="touched"         messages= {{
		                                    minLength:'Must be greather than 2 char',
		                                    maxLength:'Must be l15 charcters or less'
	                                   }} />
	                                </Col>
	                            </Row>
	                            
	                              <Row className="form-group">
	                                <Label htmlFor="comment" md={12}>Comment </Label>
	                                <Col md={12}>
	                                    <Control.textarea model=".comment" className="form-control" id="comment"  name="comment" rows="6"/>
	                                </Col>
	                            </Row>

	                            <Row className="form-group">
	                                <Col md={{size:12}}>
	                                    <Button type="submit" color="primary">Submit </Button>
	                                </Col>
	                            </Row>

	                        </LocalForm>
			        	</ModalBody>
			        </Modal>
	    	 <Button outline onClick={this.toggleForm}>
				<span className="fa fa-edit fa-lg"></span>Submit Comment
			 </Button>
		</React.Fragment>
		);
	}
}

export default CommentFormComponent;