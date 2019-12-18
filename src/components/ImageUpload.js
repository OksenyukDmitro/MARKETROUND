import React from 'react';
import { Input } from 'reactstrap';
import select from '../images/btnSelect.png';

const ImageUpload = ({ photos, onChange }) => {
  const disabled = photos.length >= 5;
  return (
    <div>
      <div>
        <div style={{
          border: ' 1px solid #DEDEE0',
          overflow: 'auto',
          marginBottom: '20px',
        }}
        >
          <div style={{
            height: '100px',
            float: 'left',
            marginLeft: '5px',
            marginTop: '10px',
            width: '100px',
            overflow: 'hidden',
          }}
          >
            <Input
              disabled={disabled}
              style={{
                margin: 'auto',
                height: '107px',
                float: 'left',
                width: '80px',
                background: '#e4e4e4',
                cursor: 'pointer',
                paddingBottom: '10px',
                marginTop: '-31px',
                backgroundImage: `url(${select})`,
                opacity: disabled ? 0.5 : 1,
              }}
              type="file"
              name="newAvatar"
              onChange={onChange}
            />
          </div>
          {photos && Array.isArray(photos) ? (
            photos.map((item) => (
              <div>
                <img
                  src={item}
                  alt="preview"
                  style={{
                    height: '92px',
                    width: '92px',
                    float: 'left',
                    padding: '5px',
                    paddingTop: '10px',
                  }}
                />
              </div>
            ))
          ) : (
            <div>
                Please select an Image for Preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default ImageUpload;
