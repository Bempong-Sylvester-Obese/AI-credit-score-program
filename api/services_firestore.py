from typing import Optional, List, Dict
from datetime import datetime
from firebase_admin import firestore

def _get_db():
    return firestore.client()

def get_or_create_user(uid: str, email: Optional[str] = None) -> dict:
    db = _get_db()
    ref = db.collection('users').document(uid)
    snap = ref.get()
    if not snap.exists:
        ref.set({
            'email': email,
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP,
        })
    else:
        if email and snap.get('email') != email:
            ref.update({'email': email, 'updated_at': firestore.SERVER_TIMESTAMP})
    return {'uid': uid, 'email': email}


def get_user_profile(uid: str) -> Optional[dict]:
    db = _get_db()
    ref = db.collection('users').document(uid).collection('profile').document('profile')
    snap = ref.get()
    return snap.to_dict() if snap.exists else None


def create_or_update_user_profile(uid: str, payload: dict) -> dict:
    db = _get_db()
    ref = db.collection('users').document(uid).collection('profile').document('profile')
    data = {k: v for k, v in payload.items() if v is not None}
    if not data:
        data = {}
    data['updated_at'] = firestore.SERVER_TIMESTAMP
    ref.set(data, merge=True)
    snap = ref.get()
    out = snap.to_dict() or {}
    out['id'] = 'profile'
    out['user_id'] = uid
    return out


def save_prediction(
    uid: str,
    assessment: Dict,
    feature_values: Optional[Dict] = None,
    transaction_count: Optional[int] = None,
    file_name: Optional[str] = None
) -> str:
    db = _get_db()
    ref = db.collection('predictions').document()
    ref.set({
        'uid': uid,
        'credit_score': assessment['credit_score'],
        'risk_probability': assessment['risk_probability'],
        'risk_category': assessment['risk_category'],
        'interpretation': assessment.get('interpretation'),
        'feature_values': feature_values,
        'transaction_count': transaction_count,
        'file_name': file_name,
        'created_at': firestore.SERVER_TIMESTAMP,
    })
    return ref.id


def get_user_predictions(uid: str, limit: int = 10, offset: int = 0) -> List[dict]:
    db = _get_db()
    q = (
        db.collection('predictions')
        .where('uid', '==', uid)
        .order_by('created_at', direction=firestore.Query.DESCENDING)
        .limit(limit + offset)
    )
    docs = list(q.stream())
    items = [d.to_dict() | {'id': d.id, 'user_id': uid} for d in docs]
    return items[offset:]


def get_user_score_history(uid: str, limit: int = 12) -> List[dict]:
    db = _get_db()
    q = (
        db.collection('predictions')
        .where('uid', '==', uid)
        .order_by('created_at', direction=firestore.Query.DESCENDING)
        .limit(limit)
    )
    docs = list(q.stream())
    out: List[dict] = []
    for d in docs:
        data = d.to_dict()
        ts = data.get('created_at')
        iso = None
        if hasattr(ts, 'isoformat'):
            iso = ts.isoformat()
        out.append({
            'score': data.get('credit_score'),
            'date': iso,
            'category': data.get('risk_category'),
            'risk_probability': data.get('risk_probability'),
        })
    return out


def get_latest_prediction(uid: str) -> Optional[dict]:
    db = _get_db()
    q = (
        db.collection('predictions')
        .where('uid', '==', uid)
        .order_by('created_at', direction=firestore.Query.DESCENDING)
        .limit(1)
    )
    docs = list(q.stream())
    if not docs:
        return None
    d = docs[0]
    return d.to_dict() | {'id': d.id, 'user_id': uid}