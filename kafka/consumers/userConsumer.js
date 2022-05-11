import { getConsumer, getProducer } from '../loaders/kafka';
import { voteQuestion } from '../services/userService'

getConsumer('users', (consumer) => {

    var producer = getProducer()

    consumer.on('message', (message) => {
        var data = JSON.parse(message.value)
        const { payload, correlationId } = data
        const { action } = payload

        console.log('Consuming data from topic ...', action)

        if (action == 'GET_USER_PROFILE') {
            getUserDetails(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log('UserService failed:', err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log('ACK message sent:', data)
                })
            })
        }

        if (action == 'VOTE_QUESTION') {
            voteQuestion(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log('Updating vote count for user failed:', err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }
                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }
                console.log(payload)
                //Send Response to acknowledge topic
                let payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log('ACK message sent:', data)
                })
            })
        }
    })
})

