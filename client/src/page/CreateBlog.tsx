import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Container, Card, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { blogAPI } from '../api/api'

export default function CreateBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (image) formData.append('image', image)

    try {

        console.log(33)
      await blogAPI.createBlog(formData)
      toast.success('Blog created successfully!')
      navigate('/blogs')
    } catch (err) {
        console.log('err', err)
      setError('Failed to create blog')
      toast.error('Blog creation failed!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <Card className="p-4 shadow">
        <h2 className="mb-4">Create New Blog</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const input = e.target as HTMLInputElement
                if (input.files) setImage(input.files[0])
              }}
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={() => navigate('/blogs')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Blog'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}