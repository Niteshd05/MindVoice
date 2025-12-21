import streamlit as st
import requests

API_URL = "https://codersmitramandal.shop/ayc/uploadaudio/"

st.set_page_config(
    page_title="AYC – Audio Psychological Analysis",
    page_icon="🎧",
    layout="centered"
)

st.title("🎧 AYC – Audio Psychological Analysis")
st.write("Upload an audio file to analyze emotions, pitch, and receive AI-generated psychological insights.")

# ------------------ UI INPUTS ------------------ #

audio_file = st.file_uploader(
    "Upload Audio File",
    type=["wav", "mp3", "m4a"]
)

choice = st.radio(
    "Language Handling",
    options=[
        ("Translate to English", "1"),
        ("Already in English", "0")
    ],
    horizontal=True
)

person = st.selectbox(
    "Who is this response for?",
    options=["patient", "doctor"]
)

submit = st.button("🚀 Analyze Audio")

# ------------------ API CALL ------------------ #

if submit:
    if audio_file is None:
        st.warning("⚠️ Please upload an audio file.")
    else:
        with st.spinner("Analyzing audio... Please wait"):
            try:
                files = {
                    "file": (audio_file.name, audio_file, audio_file.type)
                }

                data = {
                    "choice": choice[1],
                    "person": person
                }

                response = requests.post(
                    API_URL,
                    files=files,
                    data=data,
                    timeout=120
                )

                if response.status_code != 200:
                    st.error(f"❌ API Error: {response.status_code}")
                else:
                    result = response.json()

                    st.success("✅ Analysis Completed")

                    # ------------------ OUTPUT ------------------ #

                    st.subheader("📝 Transcription")
                    st.write(result.get("transcription", "N/A"))

                    st.subheader("🧠 AI Psychological Response")
                    st.write(result.get("response", "N/A"))

                    response_data = result.get("response_data", {})

                    with st.expander("🔍 Detailed Analysis"):
                        st.json(response_data)

            except requests.exceptions.Timeout:
                st.error("⏳ Request timed out. Please try again.")
            except Exception as e:
                st.error(f"❌ Unexpected error: {str(e)}")

# ------------------ FOOTER ------------------ #

st.markdown("---")
st.caption("Powered by Gemini · Speech Recognition · Emotion Analysis")
